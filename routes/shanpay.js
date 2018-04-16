var express = require("express");
var router = express.Router();
var md5 = require("md5");
var config = require("../config/config");

function createLinkstringShan(props) {
  let args = "";
  for (var i = 0; i < props.length; i++) {
    args += props[i].key + "=" + props[i].value + "&";
  }
  return args.substring(0, args.length - 1);
}

function md5SignShan($prestr, $key) {
  $prestr = $prestr + $key;
  console.log($prestr);
  return md5($prestr);
}
function buildRequestMysignShan($para_sort, $key) {
  let $prestr = createLinkstringShan($para_sort);
  let $mysign = md5SignShan($prestr, $key);
  return $mysign;
}

function md5VerifyShan($p1, $p2, $p3, $sign, $key, $pid) {
  let $prestr = $p1 + $p2 + $p3 + $pid + $key;
  let $mysgin = md5($prestr);
  if ($mysgin == $sign) {
    return true;
  } else {
    return false;
  }
}
router.get("/", function(req, res) {
  console.log("11111111");
});
router.post("/shanpay", function(req, res, next) {
  let out_order_no = req.body.WIDout_trade_no;
  let subject = req.body.WIDsubject;
  let total_fee = req.body.WIDtotal_fee;
  let body = req.body.WIDbody;
  let props = [
    { key: "partner", value: config.partner },
    { key: "user_seller", value: config.user_seller },
    { key: "out_order_no", value: out_order_no },
    { key: "subject", value: subject },
    { key: "total_fee", value: total_fee },
    { key: "body", value: body },
    { key: "notify_url", value: config.notify_url },
    { key: "return_url", value: config.return_url }
  ];
  //1,去空
  props = props.filter(function(item) {
    return item.value;
  });
  //2,排序
  props.sort(function(a, b) {
    (a = a.key.toLowerCase()), (b = b.key.toLowerCase());
    if (a > b) {
      return 1;
    } else if (a < b) {
      return -1;
    } else {
      return 0;
    }
  });
  //3，生成签名结果
  let mysign = buildRequestMysignShan(props, config.key);

  props.push({ key: "sign", value: mysign });
  res.render("shanpay.jade", {
    title: "支付中...",
    url: config.post_url,
    props: props
  });
});

router.get("/notify_url", function(req, res, next) {
  let out_order_no = req.query.out_order_no;
  let total_fee = req.query.total_fee;
  let trade_status = req.query.trade_status;
  let sign = req.query.sign;
  let key = config.key;
  let partner = config.partner;

  let $shanNotify = md5VerifyShan(
    out_order_no,
    total_fee,
    trade_status,
    sign,
    key,
    partner
  );

  if ($shanNotify) {
    //验证成功
    if (trade_status == "TRADE_SUCCESS") {
      /*
             加入您的入库及判断代码;
             判断返回金额与实金额是否想同;
             判断订单当前状态;
             完成以上才视为支付成功
             */
      //商户订单号
      let $out_trade_no = req.query.out_order_no;
      //云通付交易号
      let $trade_no = req.query.trade_no;
      //价格
      let $price = req.query.total_fee;

      console.log(req.query);
    }
    res.send("success");
  } else {
    //验证失败
    res.send("fail"); //请不要修改或删除
  }
});

router.get("/return_url", function(req, res, next) {
  let out_order_no = req.query.out_order_no;
  let total_fee = req.query.total_fee;
  let trade_status = req.query.trade_status;
  let sign = req.query.sign;
  let key = config.key;
  let partner = config.partner;
  let $shanNotify = md5VerifyShan(
    out_order_no,
    total_fee,
    trade_status,
    sign,
    key,
    partner
  );
  let msg = "";
  if ($shanNotify) {
    //验证成功
    if (trade_status == "TRADE_SUCCESS") {
      /*
             加入您的入库及判断代码;
             判断返回金额与实金额是否想同;
             判断订单当前状态;
             完成以上才视为支付成功
             */
      //商户订单号
      let $out_trade_no = req.query.out_order_no;
      //云通付交易号
      let $trade_no = req.query.trade_no;
      //价格
      let $price = req.query.total_fee;

      console.log(req.query);

      msg = "支付成功";
    } else {
      msg = "支付失败";
    }
  } else {
    msg = "验证失败";
  }
  res.render("return_url", { msg: msg });
});
module.exports = router;
