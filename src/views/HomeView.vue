<template>
  <div class="contain_out">
    <!-- 中间 -->
    <div class="contain_center flex_center">
      <div class="contain_center_inner">
        <div class="clearfix">
          <span><img src="../assets/logo.png" /></span>
          <span class="clearfix_text" style="color: #d5dde0ff">数据总览</span>
        </div>
        <div style="display: flex">
          <div class="box">
            <div class="box_inner flex_col_start">
              <div class="p1">日活</div>
              <div class="p2">{{ screenData.dau }}</div>
            </div>
          </div>
          <div class="box">
            <div class="box_inner flex_col_start">
              <div class="p1">周活</div>
              <div class="p2">{{ screenData.wau }}</div>
            </div>
          </div>
          <div class="box">
            <div class="box_inner flex_col_start">
              <div class="p1">月活</div>
              <div class="p2">{{ screenData.mau }}</div>
            </div>
          </div>
        </div>
        <div style="display: flex">
          <div class="box">
            <div class="box_inner flex_col_start">
              <div class="p1">今日注册</div>
              <div class="p2">{{ screenData.todayRegisterCustomer }}</div>
            </div>
          </div>
          <div class="box">
            <div class="box_inner flex_col_start">
              <div class="p1">累计用户</div>
              <div class="p2">{{ screenData.totalRegisterCustomer }}</div>
            </div>
          </div>
        </div>
        <div style="display: flex">
          <div class="box">
            <div class="box_inner flex_col_start">
              <div class="p1">今日挖K用户</div>
              <div class="p2">{{ screenData.todayDigOreCustomer }}</div>
            </div>
          </div>
          <div class="box">
            <div class="box_inner flex_col_start">
              <div class="p1">累计挖K用户</div>
              <div class="p2">{{ screenData.totalDigOreCustomer }}</div>
            </div>
          </div>
          <div class="box">
            <div class="box_inner flex_col_start">
              <div class="p1">今日发放K分</div>
              <div class="p2">{{ screenData.todayGrantScore }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 尾部 -->
    <div class="contain_footer flex_center">
      <div class="contain_center_inner">
        <div class="box">
          <div class="ec">
            <div id="TodayRegister" style="width: 500px; height: 300px"></div>
            <div id="TotalRegister" style="width: 500px; height: 300px"></div>
          </div>
        </div>
        <div class="box" style="margin-top: 30px">
          <div class="ec">
            <div id="d1Retention" style="width: 500px; height: 250px"></div>

            <div id="d3Retention" style="width: 500px; height: 250px"></div>
            <div id="d7Retention" style="width: 500px; height: 250px"></div>

            <div id="d30Retention" style="width: 500px; height: 250px"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import VueECharts from "vue-echarts";
import * as echarts from "echarts";
import { reqLargeScreenData } from "../api/dashboard";

export default {
  components: {},
  name: "largeScreen",

  data() {
    return {
      loading: false,
      homeState: {
        remark: "", //	备注	string
        state: "", //		状态 -1 待提交资料 0-邮箱待验证 1-待审核 2-审核通过 3-审核不通过
      },
      screenData: {},
      intervalId: null,
    };
  },
  mounted() {
    this.getLargeScreenData();
    // 在组件挂载后，启动定时器
    this.intervalId = setInterval(this.getLargeScreenData, 5000);
  },
  methods: {
    async getApplyState() {
      const result = await reqGetApplyState();
      this.homeState = result.data.data;
      console.log(this.homeState);
    },
    async getLargeScreenData() {
      console.log("倒计时");
      const result = await reqLargeScreenData();
      this.screenData = result.data.data;
      this.TodayRegisterpie();
      this.d1Retentionpie();
      this.d3Retentionpie();

      this.TotalRegisterpie();
      this.d7Retentionpie();
      this.d30Retentionpie();
    },
    TodayRegisterpie() {
      // 基于准备好的dom，初始化echarts实例
      var TodayRegister = echarts.init(
        document.getElementById("TodayRegister"),
        "dark"
      );

      // 指定图表的配置项和数据
      var option = {
        color: ["#eb6bf2", "#9e5aff", "#00b7ff"],
        backgroundColor: "rgba(0,0,0,0)",
        title: {
          text: `今日注册：${this.screenData.todayRegisterCustomer}`,
          left: "center",
        },
        tooltip: {
          trigger: "item",
        },
        legend: {
          orient: "vertical",
          left: "left",
        },
        series: [
          {
            type: "pie",
            radius: "65%",
            data: [
              {
                value: this.screenData.appletTodayRegisterCustomer,
                name: "小程序",
              },
              {
                value: this.screenData.androidTodayRegisterCustomer,
                name: "安卓",
              },
              {
                value: this.screenData.iosTodayRegisterCustomer,
                name: "	iOS",
              },
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
            },
            label: {
              normal: {
                position: "inside",
                show: true,
                formatter: (d) => {
                  return d.value;
                },
              },
            },
          },
          {
            type: "pie",
            radius: "65%",
            data: [
              {
                value: this.screenData.appletTodayRegisterCustomer,
                name: "小程序",
              },
              {
                value: this.screenData.androidTodayRegisterCustomer,
                name: "安卓",
              },
              {
                value: this.screenData.iosTodayRegisterCustomer,
                name: "	iOS",
              },
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
            },
            label: {
              normal: {
                position: "outside",
                show: true,
                formatter: (d) => {
                  return d.name;
                },
              },
            },
          },
        ],
      };
      // 使用刚指定的配置项和数据显示图表。
      TodayRegister.setOption(option);
    },
    d1Retentionpie() {
      // 基于准备好的dom，初始化echarts实例
      var d1Retention = echarts.init(
        document.getElementById("d1Retention"),
        "dark"
      );

      // 指定图表的配置项和数据
      var option = {
        color: ["#eb6bf2", "#9e5aff", "#00b7ff"],
        backgroundColor: "rgba(0,0,0,0)",
        title: {
          text: `d1留存：${this.screenData.d1RetentionRate}%`,
          left: "center",
        },
        tooltip: {
          trigger: "item",
        },
        legend: {
          orient: "vertical",
          left: "left",
        },
        series: [
          {
            type: "pie",
            radius: "57%",
            data: [
              {
                value:
                  this.screenData.d1RegisterCustomerNum -
                  this.screenData.d1RemainCustomerNum,
                name: "流失用户",
              },
              {
                value: this.screenData.d1RemainCustomerNum,
                name: "留存用户",
              },
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
            },
            label: {
              normal: {
                position: "inside",
                show: true,
                formatter: (d) => {
                  return d.value;
                },
              },
            },
          },
          {
            type: "pie",
            radius: "57%",
            data: [
              {
                value:
                  this.screenData.d1RegisterCustomerNum -
                  this.screenData.d1RemainCustomerNum,
                name: "流失用户",
              },
              {
                value: this.screenData.d1RemainCustomerNum,
                name: "留存用户",
              },
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
            },
            label: {
              normal: {
                position: "outside",
                show: true,
                formatter: (d) => {
                  return d.name;
                },
              },
            },
          },
        ],
      };
      // 使用刚指定的配置项和数据显示图表。
      d1Retention.setOption(option);
    },
    d3Retentionpie() {
      // 基于准备好的dom，初始化echarts实例
      var d3Retention = echarts.init(
        document.getElementById("d3Retention"),
        "dark"
      );

      // 指定图表的配置项和数据
      var option = {
        color: ["#eb6bf2", "#9e5aff", "#00b7ff"],
        backgroundColor: "rgba(0,0,0,0)",
        title: {
          text: `d3留存：${this.screenData.d3RetentionRate}%`,
          left: "center",
        },
        tooltip: {
          trigger: "item",
        },
        legend: {
          orient: "vertical",
          left: "left",
        },
        series: [
          {
            type: "pie",
            radius: "57%",
            data: [
              {
                value:
                  this.screenData.d3RegisterCustomerNum -
                  this.screenData.d3RemainCustomerNum,
                name: "流失用户",
              },
              {
                value: this.screenData.d3RemainCustomerNum,
                name: "留存用户",
              },
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
            },
            label: {
              normal: {
                position: "inside",
                show: true,
                formatter: (d) => {
                  return d.value;
                },
              },
            },
          },
          {
            type: "pie",
            radius: "57%",
            data: [
              {
                value:
                  this.screenData.d3RegisterCustomerNum -
                  this.screenData.d3RemainCustomerNum,
                name: "流失用户",
              },
              {
                value: this.screenData.d3RemainCustomerNum,
                name: "留存用户",
              },
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
            },
            label: {
              normal: {
                position: "outside",
                show: true,
                formatter: (d) => {
                  return d.name;
                },
              },
            },
          },
        ],
      };
      // 使用刚指定的配置项和数据显示图表。
      d3Retention.setOption(option);
    },

    TotalRegisterpie() {
      // 基于准备好的dom，初始化echarts实例
      var TotalRegister = echarts.init(
        document.getElementById("TotalRegister"),
        "dark"
      );

      // 指定图表的配置项和数据
      var option = {
        color: ["#eb6bf2", "#9e5aff", "#00b7ff"],
        backgroundColor: "rgba(0,0,0,0)",
        title: {
          text: `累计用户：${this.screenData.totalRegisterCustomer}`,
          left: "center",
        },
        tooltip: {
          trigger: "item",
        },
        legend: {
          orient: "vertical",
          left: "left",
        },
        series: [
          {
            type: "pie",
            radius: "65%",
            data: [
              {
                value: this.screenData.appletTotalRegisterCustomer,
                name: "小程序",
              },
              {
                value: this.screenData.androidTotalRegisterCustomer,
                name: "安卓",
              },
              {
                value: this.screenData.iosTotalRegisterCustomer,
                name: "	iOS",
              },
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
            },
            label: {
              normal: {
                position: "inside",
                show: true,
                formatter: (d) => {
                  return d.value;
                },
              },
            },
          },
          {
            type: "pie",
            radius: "65%",
            data: [
              {
                value: this.screenData.appletTotalRegisterCustomer,
                name: "小程序",
              },
              {
                value: this.screenData.androidTotalRegisterCustomer,
                name: "安卓",
              },
              {
                value: this.screenData.iosTotalRegisterCustomer,
                name: "	iOS",
              },
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
            },
            label: {
              normal: {
                position: "outside",
                show: true,
                formatter: (d) => {
                  return d.name;
                },
              },
            },
          },
        ],
      };
      // 使用刚指定的配置项和数据显示图表。
      TotalRegister.setOption(option);
    },

    d7Retentionpie() {
      // 基于准备好的dom，初始化echarts实例
      var d7Retention = echarts.init(
        document.getElementById("d7Retention"),
        "dark"
      );

      // 指定图表的配置项和数据
      var option = {
        color: ["#eb6bf2", "#9e5aff", "#00b7ff"],
        backgroundColor: "rgba(0,0,0,0)",
        title: {
          text: `d7留存：${this.screenData.d7RetentionRate}%`,
          left: "center",
        },
        tooltip: {
          trigger: "item",
        },
        legend: {
          orient: "vertical",
          left: "left",
        },
        series: [
          {
            type: "pie",
            radius: "57%",
            data: [
              {
                value:
                  this.screenData.d7RegisterCustomerNum -
                  this.screenData.d7RemainCustomerNum,
                name: "非活跃用户",
              },
              {
                value: this.screenData.d7RemainCustomerNum,
                name: "留存用户",
              },
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
            },
            label: {
              normal: {
                position: "inside",
                show: true,
                formatter: (d) => {
                  return d.value;
                },
              },
            },
          },
          {
            type: "pie",
            radius: "57%",
            data: [
              {
                value:
                  this.screenData.d7RegisterCustomerNum -
                  this.screenData.d7RemainCustomerNum,
                name: "非活跃用户",
              },
              {
                value: this.screenData.d7RemainCustomerNum,
                name: "留存用户",
              },
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
            },
            label: {
              normal: {
                position: "outside",
                show: true,
                formatter: (d) => {
                  return d.name;
                },
              },
            },
          },
        ],
      };
      // 使用刚指定的配置项和数据显示图表。
      d7Retention.setOption(option);
    },
    d30Retentionpie() {
      // 基于准备好的dom，初始化echarts实例
      var d30Retention = echarts.init(
        document.getElementById("d30Retention"),
        "dark"
      );

      // 指定图表的配置项和数据
      var option = {
        color: ["#eb6bf2", "#9e5aff", "#00b7ff"],
        backgroundColor: "rgba(0,0,0,0)",
        title: {
          text: `d30留存：${this.screenData.d30RetentionRate}%`,
          left: "center",
        },
        tooltip: {
          trigger: "item",
        },
        legend: {
          orient: "vertical",
          left: "left",
        },
        series: [
          {
            type: "pie",
            radius: "57%",
            data: [
              {
                value:
                  this.screenData.d30RegisterCustomerNum -
                  this.screenData.d30RemainCustomerNum,
                name: "非活跃用户",
              },
              {
                value: this.screenData.d30RemainCustomerNum,
                name: "留存用户",
              },
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
            },
            label: {
              normal: {
                position: "inside",
                show: true,
                formatter: (d) => {
                  return d.value;
                },
              },
            },
          },
          {
            type: "pie",
            radius: "57%",
            data: [
              {
                value:
                  this.screenData.d30RegisterCustomerNum -
                  this.screenData.d30RemainCustomerNum,
                name: "非活跃用户",
              },
              {
                value: this.screenData.d30RemainCustomerNum,
                name: "留存用户",
              },
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
            },
            label: {
              normal: {
                position: "outside",
                show: true,
                formatter: (d) => {
                  return d.name;
                },
              },
            },
          },
        ],
      };
      // 使用刚指定的配置项和数据显示图表。
      d30Retention.setOption(option);
    },
    jumpTo() {
      this.$router.push("/certification");
    },
  },
  beforeDestroy() {
    // 在组件销毁前清除定时器，防止内存泄漏
    clearInterval(this.intervalId);
  },
};
</script>

<style>
body {
  background-color: #050606;
}
.contain_out {
  /* min-height: calc(100vh - 50px); */
  width: 2024px;
  /* width: 100%; */

  /* min-width: 375px; */
  font-family: HarmonyOS_Sans_SC;
  min-height: 100%;
  position: relative;
  /* overflow: hidden; */
  /* background-image: url("./bac.png"); */
  background-color: #050606;
  /* background-size: cover;
  background-position: center; */
}

.contain {
  width: 100%;
  height: 70px;
  margin-left: 30px;
}
.contain .contain_inner {
  width: 95%;
  height: 120px;
}
.contain .contain_inner .left_out {
  width: 378px;
  height: 120px;
}
.contain .contain_inner .left_out .left_out_pic {
  width: 120px;
  height: 120px;
}
.contain .contain_inner .left_out .left_out_pic img {
  width: 120px;
  height: 120px;
}
.contain .contain_inner .left_out .left_out_right {
  height: 120px;
}
.contain .contain_inner .left_out .left_out_right_inner {
  height: 74px;
  width: 228px;
  margin-left: 30px;
  margin-top: 26px;
}
.contain .contain_inner .right_out {
  height: 120px;
}
.contain .contain_inner .right_out .right_out_inner {
  width: 875px;
  height: 71px;
  display: flex;
  margin-left: 230px;
}
.contain .contain_inner .right_out .right_out_inner .box {
  width: 154px;
  height: 71px;
}
.contain .contain_inner .right_out .right_out_inner .box .box_left {
  width: 110px;
  height: 71px;
}
.contain .contain_inner .right_out .right_out_inner .box .box_left .p1 {
  background: linear-gradient(to right, #5924ff, #20dfff); /* 背景设置渐变 */
  -webkit-background-clip: text; /* 使用文本作为背景裁剪 */
  color: transparent; /* 文字颜色设为透明，以显示背景渐变 */
  font-size: 36px;
  font-weight: bold;
}
.contain .contain_inner .right_out .right_out_inner .box .box_left .p2 {
  font-size: 13px;
  font-weight: bold;
  color: #cbd2d5;
}
.contain .contain_inner .right_out .right_out_inner .box .box_left img {
  width: 1px;
  height: 70px;
}

.contain_center {
  width: 100%;
  height: 350px;
}
.contain_center .contain_center_inner {
  height: 335px;
  width: 100%;
  margin-left: 40px;
}
.contain_center .contain_center_inner .box {
  display: flex;
  align-items: center;
  margin-left: 30px;
  margin-top: 30px;
  width: 313px;
  height: 128px;
  background-image: url("./border.jpg");
  background-size: 100% 100%;
  background-position: center;
}
.contain_center .contain_center_inner .box .box_inner {
  margin-left: 24px;
  width: 250px;
  height: 85px;
}
.contain_center .contain_center_inner .box .box_inner .p1 {
  font-size: 18px;
  font-weight: bold;
  color: #d5dde0;
}
.contain_center .contain_center_inner .box .box_inner .p2 {
  font-size: 60px;
  font-weight: bold;
  color: #d5dde0;
}

.contain_footer {
  width: 100%;
  height: 550px;
  margin-top: 200px;
}
.contain_footer .contain_center_inner {
  height: 100%;
  width: 100%;
  margin-left: 40px;
}
.contain_footer .contain_center_inner .head {
  margin-right: 60px;
}
.contain_footer .contain_center_inner .box {
  display: flex;
  align-items: center;
  margin-left: 30px;
  width: 100%;
  height: 292px;
}
.contain_footer .contain_center_inner .box .ec {
  display: flex;
  height: 100%;
  margin-left: 10px;
}
.contain_footer .contain_center_inner .box .ec .ec_inner {
  margin-left: 157px;
  width: 90%;
  height: 281px;
}

.flex_center {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
}

.flex_between {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
}

.flex_col_center {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
}

.flex_col_start {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  flex-wrap: wrap;
}

.flex_col_between {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
}

.flex_grow {
  flex: 1;
}

/* 标题样式 */
.clearfix {
  height: 20px;
}
.clearfix img {
  width: 5px;
  height: 20px;
}
.clearfix .clearfix_text {
  font-size: 18px;
  font-weight: bold;
  margin-left: 10px;
  vertical-align: top;
} /*# sourceMappingURL=my.css.map */
</style>
