# api-docs-backend

mongoose.js参考文档：

https://mongoosejs.com/docs/index.html

Egg中使用egg-mongoose和常用的Mongoose 方法：

https://www.cnblogs.com/wxw1314/p/10339775.html

egg-mongoose npm：

https://www.npmjs.com/package/egg-mongoose

mongoDB 菜鸟教程：

https://www.runoob.com/mongodb/mongodb-create-collection.html

win10 启动 MongoDB 服务：

```bash
# 以管理员身份运行
$ net start MongoDB
```

win10 关闭 MongoDB 服务：

```bash
# 以管理员身份运行
$ net stop MongoDB
```

MongoDB 每个文档都包含了 _id 键，这个键的值可以是任何类型的，默认是个 ObjectId 对象。

ObjectId 类似唯一主键，可以很快的去生成和排序，包含 12 bytes

- 前 4 个字节表示创建 **unix** 时间戳,格林尼治时间 **UTC** 时间，比北京时间晚了 8 个小时
- 接下来的 3 个字节是机器标识码
- 紧接的两个字节由进程 id 组成 PID
- 最后三个字节是随机数

> 由于 ObjectId 中保存了创建的时间戳，所以你不需要为你的文档保存时间戳字段，你可以通过 getTimestamp 函数来获取文档的创建时间

连接 MongoDB 服务：

```
mongodb://[username:passowrd@]host[:port][/[database][?options]]
```

- **mongodb://** 这是固定的格式，必须要指定
- **username:password@** 可选项，如果设置，在连接数据库服务器之后，驱动都会尝试登录这个数据库
- **host** 必须的指定至少一个host
- **port** 可选的指定端口，如果不填，默认为27017
- **/database** 如果指定username:password@，连接并验证登录指定数据库。若不指定，默认打开 test 数据库
- **?options** 是连接选项。如果不使用/database，则前面需要加上/



## QuickStart

<!-- add docs here for user -->

see [egg docs][egg] for more detail.

### Development

```bash
$ npm i
$ npm run dev
$ open http://localhost:7001/
```

### Deploy

```bash
$ npm start
$ npm stop
```

### npm scripts

- Use `npm run lint` to check code style.
- Use `npm test` to run unit test.
- Use `npm run autod` to auto detect dependencies upgrade, see [autod](https://www.npmjs.com/package/autod) for more detail.


[egg]: https://eggjs.org