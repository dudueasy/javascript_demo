// example1: 访问属性示例:
{
    const xiaowang = {
        love: "我喜欢你，我想和你睡觉"
    };

    function sendToMyLove(obj) {
        console.log(obj.love);
        return "流氓，滚";
    }

    console.log(sendToMyLove(xiaowang));
}

// example 2: 使用 Object.defineProperty "劫持属性访问"
{
    const xiaowang = {
        loveLetter: "我喜欢你，我想和你睡觉"
    };

    Object.defineProperty(xiaowang, "love", {
        get() {
            return xiaowang.loveLetter.replace("睡觉", "一起在晨辉的沐浴下起床");
        }
    });

    function sendToMyLove(obj) {
        console.log(obj.love);
        return "小伙子还挺有诗情画意的么，不过老娘不喜欢，滚";
    }
    console.log(sendToMyLove(xiaowang));
}

// example 3: 使用Proxy "劫持" 属性访问
{
    const xiaowang = {
        loveLetter: "我喜欢你，我想和你睡觉"
    };

    const proxy = new Proxy(xiaowang, {
        get(target, key) {
            if (key === "loveLetter") {
                console.log("target", target);
                return target[key].replace("睡觉", "一起在晨辉的沐浴下起床");
            }
        }
    });

    function sendToMyLove(obj) {
        console.log(obj.loveLetter);
        return "小伙子还挺有诗情画意的么，不过老娘不喜欢，滚";
    }

    console.log(sendToMyLove(proxy));
}

// example: 使用 Object.defineProperty 监听属性变化
{
    console.log('开始 Object.defineProperty 示例')
    function observe(obj, callback) {
        // 必须提供一个 obj 作为中介 (newObj), 否则在 setter 中对同一个对象进行赋值, 就会造成递归.
        let newObj = {}

        Object.keys(obj).forEach((key) => {
            Object.defineProperty(newObj, key, {
                enumerable: true,
                configurable: true,
                get: () => {
                    return obj[key];
                },
                set: (newValue) => {
                    console.log(123)
                    obj[key] = newValue;
                    callback(key, newValue);
                }
            });
        });

        return newObj;
    }

    const obj = observe(
        {
            name: "子君",
            gender: "男"
        },
        (key, value) => {
            console.log(`属性[${key}]的值被修改为[${value}]`);
        }
    );

    obj.name = "妹纸";
    obj.gender = '女'
}

// example5: 使用 Proxy 监听对象
{
    console.log('开始 Proxy 实例')

    function observe(obj, callback) {
        // 必须提供一个 obj 作为中介 (newObj), 否则在 setter 中对同一个对象进行赋值, 就会造成递归.
        let newObj = new Proxy(obj, {
            // receiver 是 new 出来的 proxy 对象, 也就是 newObj 自己
            get: (target, property, receiver) => {
                console.log(`target`, target)
                console.log(`receiver`, receiver)
                return target[property]
            },

            set: (target, property, value, receiver) => {
                console.log(`target`, target)
                console.log(`receiver`, receiver)
                console.log(`属性[${property}]的值被修改为[${value}]`);
                target[property] = value;
            }
        })

        return newObj;
    }

    const targetObj = {
        name: "子君",
        gender: "男"
    };

    const obj = observe(
        targetObj,
        (key, value) => {
            console.log(`属性[${key}]的值被修改为[${value}]`);
        }
    );

    obj.name = "妹纸";
    obj.gender = '女'

    console.log(`obj`, obj)
    console.log(`targetObj`, targetObj)
}

// 在 Proxy 内部使用 Reflect.get Reflect.set 来实现反射
{
    const obj = { }

    const proxy = new Proxy(obj, {
        get(target, p, receiver) {
            return Reflect.get(target, p, receiver)
        },
        set(target, p, value, receiver) {
            return Reflect.set(target, p, value, receiver)
        }
    })

    proxy.name = '123'
    console.log(`proxy.name`, proxy.name)

    console.log(`obj`, obj)
    console.log(`proxy`, proxy)
}



