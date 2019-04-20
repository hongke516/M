<template>
  <Card dis-hover>
    <Form ref="formValidate" :model="formValidate" :label-width="80">
      <Row>
        <i-col :span="12">
          <FormItem label="网点" prop="pointId">
            <i-select style="max-width: 200px" v-model="formValidate.pointId" placeholder="请选择">
              <Option v-for="(point, index) in addedPointList" :key="index" :value="point.id">{{point.name}}</Option>
            </i-select>
          </FormItem>
        </i-col>
        <i-col :span="12">
          <FormItem label="更新时间" prop="startTime">
            <Row>
              <i-col :span="11">
                <DatePicker type="date" format="yyyy-MM-dd" placeholder="请选择日期" v-model="formValidate.startTime"></DatePicker>
              </i-col>
              <i-col :span="2">至</i-col>
              <i-col :span="11">
                <DatePicker type="date" format="yyyy-MM-dd" placeholder="请选择日期" v-model="formValidate.endTime"></DatePicker>
              </i-col>
            </Row>
          </FormItem>
        </i-col>
      </Row>
    </Form>
    <Row>
      <i-col style="text-align: right;">
        <Button type="primary" style="margin-right: 16px;" @click="exportTotalReport()">导出汇总报表</Button>
        <Button type="primary" style="margin-right: 16px;" @click="exportDetailReport()">导出日明细报表</Button>
        <Button type="primary" @click="fetchData()">搜索</Button>
      </i-col>
    </Row>
    <br>
    <div>
      <Table :data="tableData1" :columns="tableColumns1" stripe></Table>
      <div style="margin: 10px;overflow: hidden">
        <div style="float: right;">
          <Page :total="total" show-total @on-change="changePage" show-elevator></Page>
        </div>
      </div>
    </div>
  </Card>
</template>

<script>
// @ is an alias to /src
import partnerApi from '../../api/partnerApi'
import {formatDate} from '../../libs/tools'
import {downloadFile} from '../../libs/util'
export default {
  name: 'partnerReport',
  components: {
  },
  data () {
    return {
      formValidate: {
        pointId: '',
        endTime: '',
        startTime: ''
      },
      addedPointList: [],
      tableData1: [],
      total: 0,
      tableColumns1: [
        {
          type: 'index',
          width: 50,
          align: 'center',
          title: '序号'
        },
        {
          title: '日期',
          width: 150,
          key: 'date'
        },
        {
          title: '网点',
          key: 'pointName'
        },
        {
          title: '派件抽成扣除',
          key: 'sendCommission',
          render: (h, params) => {
            return h('span', (params.row.sendCommission/1000).toFixed(3));
          }
        },
        {
          title: '短信费用扣除',
          key: 'smsAmount',
          render: (h, params) => {
            return h('span', (params.row.smsAmount/1000).toFixed(3));
          }
        },
        {
          title: '管理费扣除',
          key: 'managementAmount',
          render: (h, params) => {
            return h('span', (params.row.managementAmount/1000).toFixed(3));
          }
        },
        {
          title: '揽件抽成扣除',
          key: 'receiveCommission',
          render: (h, params) => {
            return h('span', (params.row.receiveCommission/1000).toFixed(3));
          }
        },
        {
          title: '其他扣费',
          key: 'finedAmount',
          render: (h, params) => {
            return h('span', (params.row.finedAmount/1000).toFixed(3));
          }
        },
        {
          title: '扣款合计',
          key: 'totalAmount',
          render: (h, params) => {
            return h('span', (params.row.totalAmount/1000).toFixed(3));
          }
        },
        {
          title: '充值金额',
          key: 'rechargeAmount',
          render: (h, params) => {
            return h('span', (params.row.rechargeAmount/1000).toFixed(3));
          }
        }
      ]
    }
  },
  mounted () {
    partnerApi.getAddedPointList()
      .then(response => {
        if (response.status === 'success') {
          this.addedPointList = response.object || []
        } else {
          this.$Message.error(response.message);
        }
      }).catch((err)=>{
      window.console.log(err)
    })
  },
  methods: {
    exportTotalReport () {
      if (this.formValidate.startTime === '' || this.formValidate.endTime === '') {
        this.$Message.error('请选择时间！');
        return
      }
      let title = {
        "date":"日期",
        "pointName":"网点",
        "receiveCommission":"派件抽成扣除",
        "smsAmount":"短信费用扣除",
        "managementAmount":"管理费扣除",
        "sendCommission":"揽件抽成扣除",
        "finedAmount":"其他扣费",
        "totalAmount":"扣款合计",
        "rechargeAmount":"充值金额"
      }
      let params = {
        pointId: this.formValidate.pointId,
        startTime: this.formValidate.startTime !== '' ?
          formatDate(this.formValidate.startTime, 'yyyy-MM-dd') : '',
        endTime: this.formValidate.endTime !== '' ?
          formatDate(this.formValidate.endTime, 'yyyy-MM-dd') : '',
        begin: 0,
        rows: 20
      }
      downloadFile('http://basic251.ibaimi.net/export/exportPartnerPointReport.htm', title, params)
    },
    exportDetailReport () {
      if (this.formValidate.startTime === '' || this.formValidate.endTime === '') {
        this.$Message.error('请选择时间！');
        return
      }
      let title = {
        "date":"日期",
        "pointName":"网点",
        "receiveCommission":"派件抽成扣除",
        "smsAmount":"短信费用扣除",
        "managementAmount":"管理费扣除",
        "sendCommission":"揽件抽成扣除",
        "finedAmount":"其他扣费",
        "totalAmount":"扣款合计",
        "rechargeAmount":"充值金额"
      }
      let params = {
        pointId: this.formValidate.pointId,
        startTime: this.formValidate.startTime !== '' ?
          formatDate(this.formValidate.startTime, 'yyyy-MM-dd') : '',
        endTime: this.formValidate.endTime !== '' ?
          formatDate(this.formValidate.endTime, 'yyyy-MM-dd') : '',
        begin: 0,
        rows: 20
      }
      downloadFile('http://basic251.ibaimi.net/export/exportPartnerPointDailyReport.htm', title, params)
    },
    changePage (pageNo) {
      // The simulated data is changed directly here, and the actual usage scenario should fetch the data from the server
      this.tableData1 = this.fetchData(pageNo - 1);
    },
    fetchData (currentPage) {
      if (this.formValidate.startTime === '' || this.formValidate.endTime === '') {
        this.$Message.error('请选择时间！');
        return
      }
      let params = {
        pointId: this.formValidate.pointId,
        startTime: this.formValidate.startTime !== '' ?
          formatDate(this.formValidate.startTime, 'yyyy-MM-dd') : '',
        endTime: this.formValidate.endTime !== '' ?
          formatDate(this.formValidate.endTime, 'yyyy-MM-dd') : '',
        begin: currentPage || 0,
        rows: 20
      }
      partnerApi.getReportData(params)
        .then(response => {
          window.console.log(response)
          this.tableData1 = response.content
          this.total = response.count
        }).catch((err)=>{
        window.console.log(err)
      })
    },
  }
}
</script>
