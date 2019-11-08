#轮播banner

CREATE TABLE `banner` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `img` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '图片路径',
  `title` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT 'banner名称',
  `src` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT 'banner链接地址',
  `sort` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '排序(数字越大越靠前)',
  `state` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '状态（1，显示。0隐藏）',
  `creatTime` datetime DEFAULT NULL COMMENT '创建时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;


#退款订单

CREATE TABLE `blackorder` (
  `id` int(11) NOT NULL COMMENT '退款ID',
  `orderNo` int(11) DEFAULT NULL COMMENT '退款订单流水',
  `status` varchar(255) DEFAULT NULL COMMENT '退款状态(1,成功，2失败，3退款中)',
  `price` decimal(10,2) DEFAULT NULL COMMENT '退款金额',
  `addTime` datetime DEFAULT NULL COMMENT '发起退款时间',
  `updateTime` datetime DEFAULT NULL COMMENT '订单更新时间',
  `type` varchar(255) DEFAULT NULL COMMENT '退款类型（1,支付方式原路退回，2，现金退款）',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

#文章
CREATE TABLE `new` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'id',
  `img` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '主图',
  `creatTime` datetime DEFAULT NULL COMMENT '创建时间',
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '文章名称',
  `updataTime` datetime DEFAULT NULL COMMENT '修改时间',
  `read` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '阅读数量',
  `content` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '文章内容',
  `author` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '作者',
  `state` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '状态（1，显示，0，隐藏）',
  `sort` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '排序，数字越大越靠前',
  `type` varchar(255) DEFAULT NULL COMMENT ' 新闻类型',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

#订单

CREATE TABLE `order` (
  `id` int(10) NOT NULL AUTO_INCREMENT COMMENT '订单ID',
  `total` decimal(10,2) DEFAULT NULL COMMENT '订单总价',
  `num` int(11) DEFAULT NULL COMMENT '订单购买数量',
  `pname` varchar(255) DEFAULT NULL COMMENT '产品名称',
  `payStyle` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '支付方式(1,微信，2，支付宝，)',
  `price` decimal(10,2) DEFAULT NULL COMMENT '产品单价',
  `pid` int(11) DEFAULT NULL COMMENT '产品ID',
  `payPrice` decimal(10,2) DEFAULT NULL COMMENT '支付金额',
  `payid` int(11) DEFAULT NULL COMMENT '支付ID',
  `state` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '订单状态(1,未支付，2，已支付未出行，3，已出行，4已完成,5,已退款)',
  `concatName` varchar(255) DEFAULT NULL COMMENT '联系人姓名',
  `pimg` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `concatPhone` varchar(255) DEFAULT NULL COMMENT '联系人手机',
  `remarke` varchar(255) DEFAULT NULL COMMENT '联系人备注',
  `createTime` datetime DEFAULT NULL COMMENT '订单创建时间',
  `payTime` datetime DEFAULT NULL COMMENT '订单支付时间',
  `travelTime` datetime DEFAULT NULL COMMENT '订单出行时间',
  `orderComTime` datetime DEFAULT NULL COMMENT '订单完成时间',
  `blackTime` datetime DEFAULT NULL COMMENT '订单退款时间',
  `blacId` varchar(255) DEFAULT NULL COMMENT '退款订单ID',
  `userId` int(11) DEFAULT NULL COMMENT '用户ID',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=38 DEFAULT CHARSET=utf8;

#产品

CREATE TABLE `product` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT ' 产品名称',
  `price` decimal(10,2) DEFAULT NULL COMMENT '产品价格',
  `content` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '产品描述内容',
  `desc` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '描述',
  `creatTime` datetime DEFAULT NULL COMMENT '创建时间',
  `updateTime` datetime DEFAULT NULL COMMENT '更新时间',
  `imgArray` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '全部图片列表数组',
  `type` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '产品类型',
  `quality` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '产品特色，数组字符串',
  `img` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '产品主图显示图片',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8;

#出行人

CREATE TABLE `travelpeople` (
  `id` int(12) NOT NULL AUTO_INCREMENT COMMENT '出行人ID',
  `orderId` int(12) DEFAULT NULL COMMENT '订单ID，可以订单关联',
  `peopleName` varchar(255) DEFAULT NULL COMMENT '出行人名称',
  `peopleCardType` varchar(255) DEFAULT '1' COMMENT '出行人证件类型（1，身份证,2，学生证）',
  `peopleCardId` int(18) DEFAULT NULL COMMENT '出行人证件号码',
  `peoplePhone` varchar(255) DEFAULT NULL COMMENT '出行人手机号码',
  `createTime` datetime DEFAULT NULL COMMENT '创建时间',
  `updataTime` datetime DEFAULT NULL COMMENT '更新时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8;

#用户信息

CREATE TABLE `user` (
  `userid` int(11) NOT NULL AUTO_INCREMENT,
  `userName` varchar(255) DEFAULT NULL,
  `passWord` varchar(255) DEFAULT NULL,
  `tel` varchar(255) DEFAULT NULL,
  `realName` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `iconUrl` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `nikeName` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`userid`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;