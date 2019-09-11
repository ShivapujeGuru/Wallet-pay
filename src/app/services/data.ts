import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { LoginData } from '../models/login.model';
import { RegistrationData } from '../models/registration.model';
import { BankData } from '../models/bank.model';
import { TransferData } from '../models/transfer.model';
import { Subject } from 'rxjs';
import { ItemData, BuyItemData } from '../models/item.model';

@Injectable()
export class DataService {

    phoneNumber : any;
    walletBalance = new Subject<number>();
    serverUrl = 'http://192.168.2.50:1337/';
    url = this.serverUrl+'register';
    merchantsUrl = this.serverUrl+'merchantList';
    apiUrl = this.serverUrl+'list';
    loginUrl = this.serverUrl+'login';
    addBankUrl = this.serverUrl+'addBank';
    checkBalanceUrl = this.serverUrl+'bankBalance';
    transferUrl = this.serverUrl+'transfer';
    addToWalletUrl = this.serverUrl+'addToWallet';
    walletBalanceUrl = this.serverUrl+'walletBalance';
    walletToBankUrl = this.serverUrl+'walletToBank';
    itemsUrl = this.serverUrl+'listItems';
    userItemsUrl = this.serverUrl+'listUserItems';
    addItemUrl = this.serverUrl+'item';
    buyItemUrl = this.serverUrl+'buyItem';
    historyUrl = this.serverUrl+'mHistory';

    constructor(private http: HttpClient) {}

    createUser(regData: RegistrationData) {
        return this.http.post(this.url,
        {
            "username": regData.username,
            "email": regData.email,
            "phoneNumber": regData.phoneNumber,
            "password": regData.password,
            "isMerchant": regData.merchant 
        })
        .pipe(map(data =>
        {
            localStorage.setItem('details', JSON.stringify(data['user']));
            return data['user'];
        },
        error  => {
            console.log("Error", error);
        }
        ));
    }

    signinUser(loginData: LoginData) {
        return this.http.post(this.loginUrl,
        {
            "phoneNumber": loginData.phoneNumber,
            "password": loginData.password
        })
        .pipe(map(data => 
            {
                localStorage.setItem('details', JSON.stringify(data['user']));
                return data['user'];
            },
            error  => {
                console.log(error);
            }
        ));
    }

    getUsersList() {
        return this.http.get(this.apiUrl)
            .pipe(map(data => 
            {
                return data['list'];
            },
            error  => {
                console.log("Error", error);
            }
        ));
    }

    getMerchantsList() {
        return this.http.get(this.merchantsUrl)
            .pipe(map(data => 
            {
                return data['merchantList'];
            },
            error  => {
                console.log("Error", error);
            }
        ));
    }

    getItemsList() {
        return this.http.get(this.itemsUrl)
            .pipe(map(data => 
            {
                return data['listItems'];
            },
            error  => {
                console.log("Error", error);
            }
        ));
    }

    getUserItemsList(id: any) {
        let params = new HttpParams();
        params = params.append('senderId', id);
        return this.http.get(this.userItemsUrl, {params: params})
            .pipe(map(data => 
            { 
                return data['listUserItems'];
            },
            error  => {
                console.log("Error", error);
            }
        ));
    }

    addItem(itemData: ItemData, phoneNumber: any) {
        return this.http.post(this.addItemUrl,
        {
            "itemName": itemData.itemName,
            "itemPrice": itemData.itemPrice,
            "phoneNumber": phoneNumber
        })
        .pipe(map(data => 
            { 
                return data;
            },
            error  => {
                console.log("Error", error);
            }
        ));
    }

    buyItem(senderId: any, buyItemData: BuyItemData) {
        return this.http.post(this.buyItemUrl,
        {
            "senderId": senderId,
            "merchantNumber": buyItemData.merchantNumber,
            "itemId": buyItemData.id,
            "itemName": buyItemData.itemName,
            "itemPrice": buyItemData.itemPrice
        })
        .pipe(map(data => 
            {
                return data;
            },
            error  => {
                console.log("Error", error);
            }
        ));
    }

    getUserDetails() {
        return JSON.parse(localStorage.getItem('details'));
    }

    getBankDetails() {
        return JSON.parse(localStorage.getItem('details'))['bank'];
    }

    addBankDetails(bankDetails: BankData, id: number) {
        return this.http.post(this.addBankUrl,
        {
            "accountNumber": bankDetails.accountNumber,
            "bankName": bankDetails.bankName,
            "balance": bankDetails.balance,
            "owner": id
        })
        .pipe(map(data => 
        { 
            localStorage.setItem('bankDetails', JSON.stringify(data['data']));
            return data['data'];
        },
        error  => {
            console.log("Error", error);
        }
        ));
    }

    checkBalance(phoneNumber: any) {
        let params = new HttpParams();
        params = params.append('phoneNumber', phoneNumber);
        return this.http.get(this.checkBalanceUrl, {params: params})
            .pipe(map(data => 
            {
                return data['data'];
            },
            error  => {
                console.log("Error", error);
            }
        ));
    }

    transferMoney(id: number, transferDetails: TransferData) {
        return this.http.post(this.transferUrl,
        {
            "senderId": id,
            "recieverNumber": transferDetails.recieverNumber,
            "amount": transferDetails.amount
        })
        .pipe(map(data => 
        { 
            return data;
        },
        error  => {
            console.log("Error", error);
        }
        ));
    }

    addWalletMoney(id: number, amount: number) {
        return this.http.post(this.addToWalletUrl,
        {
            "userId": id,
            "amount": amount
        })
        .pipe(map(data => 
        { 
            return data;
        },
        error  => {
            console.log("Error", error);
        }
        ));
    }

    getWalletBalance() {
        let params = new HttpParams();
        this.phoneNumber = JSON.parse(localStorage.getItem('details'))['phoneNumber'];
        params = params.append('phoneNumber', this.phoneNumber);
        this.http.get(this.walletBalanceUrl, {params: params})
        .pipe(map(data => 
            {
                this.walletBalance.next(data['data'].walletBalance);
                return data['data'].walletBalance;
            },
            error  => {
                console.log("Error", error);
            }
        ))
        .subscribe(
            (data) => {
                if(data) {
                    this.walletBalance.next(data);
                }
            },
            error => {
                console.log(error);
            }
        );
    }

    sendMoneyToBank(phoneNumber: any) {
        return this.http.post(this.walletToBankUrl,
        {
            "phoneNumber": phoneNumber
        })
        .pipe(map(data => 
        { 
            return data;
        },
        error  => {
            console.log("Error", error);
        }
        ));
    }

    getHistory(id: any) {
        let params = new HttpParams();
        params = params.append('userId', id);
        return this.http.get(this.historyUrl, {params: params})
            .pipe(map(data => 
            { 
                return data;
            },
            error  => {
                console.log("Error", error);
            }
        ));
    }

    logout() {
        localStorage.clear();
    }
}