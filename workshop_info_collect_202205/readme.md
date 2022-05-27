# 厂商信息收集


|字段|类型|必填|含义|
|:-|:-|:-|:-|
|workshopProvinceCity|string|required|厂房位置：厂房省市位置|
|workshopDetailAddress|string|required|厂房位置：详细地址|
|plantArea|number|required|厂房面积：单位平方|
|floorHeight|number|required|层高|
|long|number|required|长|
|width|number|required|宽|
|layerNumber|string|required|层数：单层、多层、混合层|
|space|string|required|厂房空间结构:排架结构、砖混结构、钢架结构|
|power|string|required|电力容量（千瓦）:0-20(含20)、20-50(含50)、50-100(含100)、100-150(含150)、150-200(含200)、200以上|
|driving|string|required|行车:有、无、可加装|
|t|string|not|吨位（吨）:2、2-5、5以上|
|office|string|required|办公用房配套：有、无|
|officeArea|number|not|面积：单位平方|
|dormitory|string|dormitory|required|员工宿舍配套：无、有|
|dormitoryArea|number|not|面积：单位平方|
|refectory|string|required|员工食堂配套：有、无|
|numberOfPeople|number|not|可容纳人数：单位人|
|naturalGas|string|required|天然气供应：无、有|
|wastewater[]|array|required|污水处理：已接入管网、仅生活污水、仅工业污水、实现雨污分流|
|plantFeatures[]|array|required|厂房特色：可注册公司、可改造、可轻加工、可环评、证件齐全、有排污证、独门独院|
|productionDomain[]|array|required|生产领域：冷加工车间、热加工车间、恒温恒湿、洁净车间、特种状况|
|plantDescription|text|required|厂房描述|
|images[]|file|not|厂房实景图片：三张|
|mode|string|required|合作模式：出租、出售、租金入股、面议|
|contacts|string|not|联系人|
|contactNumber|string|not|联系电话(验证手机号格式、无短信验证)|
