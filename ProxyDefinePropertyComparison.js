
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

// example 2: 使用 Object.defineProperty, "劫持属性访问"
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

// example 3 使用Proxy "劫持" 属性访问
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

// 示例: 使用 Object.defineProperty 监听属性变化 

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


{

    console.log('开始 Proxy 实例')

    function observe(obj, callback) {
        // 必须提供一个 obj 作为中介 (newObj), 否则在 setter 中对同一个对象进行赋值, 就会造成递归.
        let newObj = new Proxy({}, {
            get: (target, property) => {
                return target[property]
            },

            set: (target, property, value) => {
                console.log(`属性[${property}]的值被修改为[${value}]`);
                target[property] = value;
            }

        })


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

