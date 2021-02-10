import Mock from 'mockjs';

const apiBaseInfo = [
    {
        label: "项目名称",
        desc: "测试项目"
    },
    {
        label: "项目简介",
        desc: "这是简介"
    },
    {
        label: "版本",
        desc: "0.1.0"
    },
    {
        label: "host",
        desc: "http://127.0.0.1"
    },
    {
        label: "basePath",
        desc: "/"
    },
    {
        label: "接口url",
        desc: "http://127.0.0.1/"
    }
]

const apiNavMenu = [
    {
        icon: 'file-done',
        title: '公共接口',
        children: [
            {
                icon: 'file-done',
                title: '获取主节点信息',
                path: '111'
            },
            {
                icon: 'file-done',
                title: '获取集群当前登录用户名',
                path: '222'
            }
        ]
    },
    {
        icon: 'menu',
        title: '租户管理',
        children: [
            {
                icon: 'file-done',
                title: '编辑租户',
                path: '333'
            },
            {
                icon: 'file-done',
                title: '删除租户',
                path: '444'
            }
        ]
    },
    {
        icon: 'user',
        title: '用户组管理',
        children: [
            {
                icon: 'file-done',
                title: '添加用户组',
                path: '555'
            },
            {
                icon: 'file-done',
                title: '删除用户组',
                path: '666'
            }
        ]
    }
]

const apiDetails = [
    {
        operationId: "111",
        summary: {
            title: "获取主节点信息",
            method: "GET",
            url: "/api/lark/system-info/getMasterIp",
            consumes: "application/json",
            produces: ["application/json"],
        },
        description: "获取主节点信息",
        reqParams: [],
        reqExample: {},
        resStatus: [
            {
                code: "200",
                description: "OK",
                schema: "",
            },
            {
                code: "201",
                description: "Created",
                schema: "",
            },
            {
                code: "401",
                description: "Unauthorized",
                schema: "",
            },
            {
                code: "403",
                description: "Fobidden",
                schema: "",
            },
            {
                code: "404",
                description: "Not found",
                schema: "",
            },
        ],
        resParams: [
            {
                name: "masterIp",
                description: "主节点ip",
                type: "string",
                format: "",
            }
        ],
        resExample: {
            success: false,
            data: {
                masterIp: "10.3.71.102"
            },
            msg: "",
            code: 200
        }
    },
    {
        operationId: "222",
        summary: {
            title: "获取集群当前登录用户名",
            method: "POST",
            url: "/api/lark/system-info/getUsername",
            consumes: "application/x-www-form-urlencoded",
            produces: ["*/*"],
        },
        description: "获取集群当前登录用户名",
        reqParams: [
            {
                name: "id",
                description: "主键id ,示例值(12)",
                in: "body",
                required: true,
                type: "integer",
                format: "",
            },
            {
                name: "username",
                description: "用户名",
                in: "query",
                required: false,
                type: "string",
                format: "",
            },
        ],
        reqExample: {
            "name": "dbydm",
            "age": 12,
            "sex": false,
            "info": ["10.3.71.102", "10.3.71.104", "10.3.71.106"],
            "sssds": {
                "ssdsdsd": "sfsdsdsd"
            }
        },
        resStatus: [
            {
                code: "200",
                description: "OK",
                schema: "",
            },
            {
                code: "201",
                description: "Created",
                schema: "",
            },
            {
                code: "401",
                description: "Unauthorized",
                schema: "",
            },
            {
                code: "403",
                description: "Fobidden",
                schema: "",
            },
            {
                code: "404",
                description: "Not found",
                schema: "",
            },
        ],
        resParams: [
            {
                name: "id",
                description: "主键id",
                type: "integer",
                format: "",
            },
            {
                name: "username",
                description: "用户名",
                type: "string",
                format: "",
            },
        ],
        resExample: {
            success: true,
            data: {},
            msg: "",
            code: 200
        }
    },
    {
        operationId: "333",
        summary: {
            title: "编辑租户",
            method: "PUT",
            url: "/api/lark/system-info/editTenant",
            consumes: "application/json",
            produces: ["application/octet-stream"],
        },
        description: "编辑租户",
        reqParams: [
            {
                name: "tenantName",
                description: "租户名称",
                in: "body",
                required: true,
                type: "string",
                format: "",
            },
            {
                name: "username",
                description: "当前登录的用户名",
                in: "query",
                required: true,
                type: "string",
                format: "",
            },
        ],
        reqExample: {
            tenantName: "ceshi2333"
        },
        resStatus: [
            {
                code: "200",
                description: "OK",
                schema: "",
            },
            {
                code: "201",
                description: "Created",
                schema: "",
            },
            {
                code: "401",
                description: "Unauthorized",
                schema: "",
            },
            {
                code: "403",
                description: "Fobidden",
                schema: "",
            },
            {
                code: "404",
                description: "Not found",
                schema: "",
            },
        ],
        resParams: [],
        resExample: {
            success: true,
            data: {},
            msg: "",
            code: 200
        }
    },
    {
        operationId: "444",
        summary: {
            title: "删除租户",
            method: "DELETE",
            url: "/api/lark/system-info/deleteTenant",
            consumes: "application/json",
            produces: ["application/json"],
        },
        description: "删除租户",
        reqParams: [
            {
                name: "tenantName",
                description: "租户名称",
                in: "body",
                required: true,
                type: "string",
                format: "",
            },
            {
                name: "username",
                description: "当前登录的用户名",
                in: "query",
                required: true,
                type: "string",
                format: "",
            },
        ],
        reqExample: {
            tenantName: "ceshi2333"
        },
        resStatus: [
            {
                code: "200",
                description: "OK",
                schema: "",
            },
            {
                code: "201",
                description: "Created",
                schema: "",
            },
            {
                code: "401",
                description: "Unauthorized",
                schema: "",
            },
            {
                code: "403",
                description: "Fobidden",
                schema: "",
            },
            {
                code: "404",
                description: "Not found",
                schema: "",
            },
        ],
        resParams: [],
        resExample: {
            success: true,
            data: {},
            msg: "",
            code: 200
        }
    },
    {
        operationId: "555",
        summary: {
            title: "添加用户组",
            method: "POST",
            url: "/api/lark/system-info/addUserGroup",
            consumes: "application/x-www-form-urlencoded",
            produces: ["*/*"],
        },
        description: "添加用户组",
        reqParams: [
            {
                name: "userGroup",
                description: "用户组名称",
                in: "body",
                required: true,
                type: "string",
                format: "",
            },
            {
                name: "relatedTenant",
                description: "关联租户",
                in: "body",
                required: true,
                type: "string",
                format: "",
            },
        ],
        reqExample: {
            userGroup: "ceshi2333",
            relatedTenant: "root"
        },
        resStatus: [
            {
                code: "200",
                description: "OK",
                schema: "",
            },
            {
                code: "201",
                description: "Created",
                schema: "",
            },
            {
                code: "401",
                description: "Unauthorized",
                schema: "",
            },
            {
                code: "403",
                description: "Fobidden",
                schema: "",
            },
            {
                code: "404",
                description: "Not found",
                schema: "",
            },
        ],
        resParams: [],
        resExample: {
            success: true,
            data: {},
            msg: "",
            code: 200
        }
    },
    {
        operationId: "666",
        summary: {
            title: "删除用户组",
            method: "DELETE",
            url: "/api/lark/system-info/deleteUserGroup",
            consumes: "application/x-www-form-urlencoded",
            produces: ["*/*"],
        },
        description: "删除用户组",
        reqParams: [
            {
                name: "userGroup",
                description: "用户组名称",
                in: "body",
                required: true,
                type: "string",
                format: "",
            },
            {
                name: "username",
                description: "当前登录的用户名",
                in: "query",
                required: true,
                type: "string",
                format: "",
            }
        ],
        reqExample: {
            userGroup: "ceshi233"
        },
        resStatus: [
            {
                code: "200",
                description: "OK",
                schema: "",
            },
            {
                code: "201",
                description: "Created",
                schema: "",
            },
            {
                code: "401",
                description: "Unauthorized",
                schema: "",
            },
            {
                code: "403",
                description: "Fobidden",
                schema: "",
            },
            {
                code: "404",
                description: "Not found",
                schema: "",
            },
        ],
        resParams: [],
        resExample: {
            success: true,
            data: {},
            msg: "",
            code: 200
        }
    }
]

export default {
    getApiBaseInfo: config => {
        return {
            success: true,
            data: apiBaseInfo,
            msg: "",
            code: 200
        }
    },
    getApiNavMenu: config => {
        return {
            success: true,
            data: apiNavMenu,
            msg: "",
            code: 200
        }
    },
    getApiDetail: config => {
        const path = config.url.split("id=")[1];
        return {
            success: true,
            data: apiDetails.find(item => item.operationId == path),
            msg: "",
            code: 200
        }
    }
}