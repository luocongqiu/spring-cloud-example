# spring-cloud-example
用spring cloud 构建微服务架构 spring cloud + mybatis + mapstruct + lombok

## api-gateway
统一对外接口 路由所有服务
## config-server
全局环境配置服务 通过git配置所有服务配置文件
## eureka-server
注册中心 用于注册微服务
## user
用户微服务 接口、客户端、实现分离
## core
微服务全局依赖 统一异常处理等

## 启动
config-server -> eureka-server -> api-gateway -> user
