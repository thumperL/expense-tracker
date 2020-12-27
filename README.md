# 廣志の私帳 - Expense Tracker

一個簡單的網路記帳工具。核心功能是讓使用者新增、修改與刪除「支出紀錄」。

## Features - 產品功能

1. 在首頁一次瀏覽所有支出的清單
2. 在首頁看到所有支出清單的總金額
3. 新增一筆支出
4. 編輯支出的所有屬性 (一次只能編輯一筆)
5. 刪除任何一筆支出 (一次只能刪除一筆)
6. 在首頁可以根據支出「類別」篩選支出；總金額的計算只會包括被篩選出來的支出總和。

## Prerequisites - 系統需求

1. [Node.js] v14.15.1 (https://nodejs.org/en/)

## Installation - 安裝流程

1. Install [nvm] (https://github.com/nvm-sh/nvm) - 安裝nvm，nodejs的管理系統

2. Use [nvm] to install [nodejs] v14.15.1 - 利用nvm去安裝及使用nodejs ver.14.15.1
```
nvm install 14.15.1
nvm use 14.15.1
```

3. Install required package.  Change directory to project directory, then execute the following. - 在[Terminal]下切換到專案的資料夾，並執行以下command。
```
cd [project-folder-path]
npm install
```

4. Add sample data. - 運行以下command，新增sample data
```
npm run seed
```

5. Start the web application, run the command below in terminal - 啟動專案，請在終端機執行以下指令
```
npm run start
```

6. Test login account can be found via /models/seeds/userSeeder.js - 在 /models/seeds/userSeeder.js 檔案中能夠找到測試用的User。

## Contributor

> [Thumper](https://github.com/thumperL)