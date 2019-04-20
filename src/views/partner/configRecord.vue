<template>
  <Card dis-hover>
    <Form ref="formValidate" :model="formValidate" :label-width="80">
      <Row>
        <i-col :span="12">
          <FormItem label="网点" prop="address">
            <i-select style="max-width: 200px" v-model="formValidate.pointId" placeholder="请选择">
              <Option :value="''">请选择</Option>
              <Option v-for="(point, index) in addedPointList" :key="index" :value="point.id">{{point.name}}</Option>
            </i-select>
          </FormItem>
        </i-col>
        <i-col :span="12">
          <FormItem label="更新时间" prop="date">
            <Row>
              <i-col :span="11">
                <DatePicker type="date" format="yyyy-MM-dd" placeholder="请选择日期" v-model="formValidate.updateStartTime"></DatePicker>
              </i-col>
              <i-col :span="2">至</i-col>
              <i-col :span="11">
                <DatePicker type="date" format="yyyy-MM-dd" placeholder="请选择日期" v-model="formValidate.updateEndTime"></DatePicker>
              </i-col>
            </Row>
          </FormItem>
        </i-col>
      </Row>
    </Form>
    <Row>
      <i-col style="text-align: right;">
        <Button type="primary" @click="fetchData()">搜索</Button>
      </i-col>
    </Row>
    <br>
    <div>
      <Table :data="tableData1" :columns="tableColumns1" stripe></Table>
      <div style="margin: 10px;overflow: hidden">
        <div style="float: right;">
          <Page :total="100" show-total :current="1" @on-change="changePage"></Page>
        </div>
      </div>
    </div>
  </Card>
</template>

<script>
// @ is an alias to /src
import partnerApi from '../../api/partnerApi'
import {formatDate} from '../../libs/tools'
export default {
  name: 'partnerConfigRecord',
  components: {
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
  data () {
    return {
      formValidate: {
        pointId: '',
        updateEndTime: '',
        updateStartTime: ''
      },
      total: 0,
      addedPointList: [],
      tableData1: [],
      tableColumns1: [
        {
          type: 'index',
          width: 50,
          align: 'center',
          title: '序号'
        },
        {
          title: '更新时间',
          width: 100,
          key: 'modifyTime'
        },
        {
          title: '网点',
          width: 100,
          key: 'pointName'
        },
        {
          title: '操作类型',
          width: 100,
          key: 'type'
        },
        {
          title: '派件抽成/件/元',
          width: 120,
          key: 'sendCommission'
        },
        {
          title: '揽件抽成/件/元',
          width: 120,
          key: 'receiveCommission'
        },
        {
          title: '揽派比目标',
          width: 100,
          key: 'sendReceiveRatio'
        },
        {
          title: '短信收费/条/元',
          width: 120,
          key: 'smsFee'
        },
        {
          title: '管理费用/月/元',
          width: 120,
          key: 'managementFee'
        },
        {
          title: '管理费扣款日期',
          width: 120,
          key: 'managementFeeDay'
        },
        {
          title: '管理费扣款月份',
          width: 200,
          key: 'managementFeeMonth'
        },
        {
          title: '合伙人姓名',
          width: 100,
          key: 'partnerName'
        },
        {
          title: '合伙人联系电话',
          width: 120,
          key: 'phoneNumber'
        }
      ],
    }
  },
  methods: {
    changePage (pageNo) {
      window.console.log(11, pageNo)
      // The simulated data is changed directly here, and the actual usage scenario should fetch the data from the server
      this.tableData1 = this.fetchData(pageNo - 1);
    },
    fetchData (currentPage) {
      let params = {
        pointId: this.formValidate.pointId,
        updateStartTime: this.formValidate.updateStartTime !== '' ?
          formatDate(this.formValidate.updateStartTime, 'yyyy-MM-dd') : '',
        updateEndTime: this.formValidate.updateEndTime !== '' ?
          formatDate(this.formValidate.updateEndTime, 'yyyy-MM-dd') : '',
        begin: currentPage || 0,
        rows: 20
      }
      partnerApi.getPartnerConfigData(null, params)
        .then(response => {
          window.console.log(response)
          this.tableData1 = response.content
          this.total = response.count
        }).catch((err)=>{
        window.console.log(err)
      })
    }
  }
}
</script>
