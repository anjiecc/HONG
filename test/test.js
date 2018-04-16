/**
 * Created by Administrator on 2017/8/8.
 */
var props=[
    {key: "partner", value: "2"},
    {key: "user_seller", value: "3"},
    {key: "out_order_no", value: ""},
    {key: "subject", value: ""},
    {key: "total_fee", value:""},
    {key: "body", value: ""},
    {key: "notify_url", value:""},
    {key: "return_url", value:""},
];
/*props=props.filter(function (item) {
    return item.value
})*/
console.log(props)

props.sort(function (a, b) {
    a = a.key.toLowerCase(), b = b.key.toLowerCase();
    if( a > b) {
        return 1;
    } else if(a < b) {
        return -1;
    } else {
        return 0;
    }
})


function buildSign(props) {
    let args="";
    for(var i=0;i<props.length;i++){
        args+=props[i].key+"="+props[i].value+"&"
    }
    console.log(args)
    return args.substring(0,args.length-2)
}
console.log(buildSign(props))
console.log(props)