<template>
  <Card dis-hover>
    <Form ref="formValidate" :model="formValidate" :label-width="80">
      <Row>
        <i-col :span="12">
          <Row>
            <i-col :span="12">
              <FormItem label="网点" prop="pointId">
                <i-select style="max-width: 200px" v-model="formValidate.pointId" placeholder="请选择">
                  <Option :value="''">请选择</Option>
                  <Option v-for="(point, index) in addedPointList" :key="index" :value="point.id">{{point.name}}</Option>
                </i-select>
              </FormItem>
            </i-col>
            <i-col :span="12">
              <FormItem label="账务类型" prop="financialType">
                <i-select v-model="formValidate.financialType" placeholder="请选择">
                  <Option value="beijing" v-for="(item, index) in financialTypes" :key="index">{{item}}</Option>
                </i-select>
              </FormItem>
            </i-col>
          </Row>
        </i-col>
        <i-col :span="12">
          <FormItem label="更新时间" prop="date">
            <Row>
              <i-col :span="11">
                <DatePicker type="date" clearable format="yyyy-MM-dd" placeholder="请选择日期" v-model="formValidate.startTime"></DatePicker>
              </i-col>
              <i-col :span="2">至</i-col>
              <i-col :span="11">
                <DatePicker type="date" format="yyyy-MM-dd" placeholder="请选择日期" v-model="formValidate.endTime"></DatePicker>
              </i-col>
            </Row>
          </FormItem>
        </i-col>
      </Row>
      <Row>
        <i-col :span="6">
          <FormItem label="是否入账" prop="status">
            <i-select v-model="formValidate.status" placeholder="请选择">
              <Option value="0">未入账</Option>
              <Option value="1">已入账</Option>
            </i-select>
          </FormItem>
        </i-col>
      </Row>
    </Form>
    <Row>
      <i-col :span="12">
        <RadioGroup v-model="formValidate.type" type="button" @on-change="fetchData">
          <Radio label="0" :value="0">全部</Radio>
          <Radio label="1" :value="1">充值</Radio>
          <Radio label="2" :value="2">扣款</Radio>
        </RadioGroup>
      </i-col>
      <i-col :span="12" style="text-align: right;">
        <Button type="primary" style="margin-right: 16px;">添加其他扣款</Button>
        <Button type="primary" @click="fetchData()">搜索</Button>
      </i-col>
    </Row>
    <br>
    <div>
      <Table :data="tableData1" :columns="tableColumns1" stripe></Table>
      <div style="margin: 10px;overflow: hidden">
        <div style="float: right;">
          <Page :total="total" show-total :current="1" @on-change="changePage()"></Page>
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
  name: 'partnerBill',
  components: {
  },
  data () {
    return {
      financialTypes: {
        "1":"派件抽成扣款",
        "2":"短信费扣款",
        "3":"管理费扣款",
        "4":"充值",
        "5":"其他扣款",
        "6":"揽件抽成扣款"
      },
      statusType: {
        "0":"未入账",
        "1":"已入账"
      },
      addedPointList: [],
      formValidate: {
        pointId: '',
        type: '0',
        status: '1',
        startTime: '',
        financialType: '',
        endTime: ''
      },
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
          title: '账单日期',
          key: 'billDate'
        },
        {
          title: '网点',
          key: 'pointName'
        },
        {
          title: '财务类型',
          key: 'financialType',
          render: (h, params) => {
            return h('span', this.financialTypes[params.row.financialType]);
          }
        },
        {
          title: '收支金额（元）',
          key: 'amount',
          render: (h, params) => {
            return h('span', (params.row.amount/1000).toFixed(3));
          }
        },
        {
          title: '账户余额（元）',
          key: 'accountBalance',
          render: (h, params) => {
            return h('span', params.row.status === 1 ? (params.row.accountBalance/1000).toFixed(3) : '未知');
          }
        },
        {
          title: '备注说明',
          width: 250,
          key: 'remark',
          render: (h, params) => {
            return h('a', {
              on: {
                click: () => {
                  this.showAll(params.row.remark)
                }
              }
            }, this.limitText(params.row.remark, 60));
          }
        },
        {
          title: '入账状态',
          key: 'status',
          render: (h, params) => {
            return h('span', this.statusType[params.row.status])
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
    showAll (content) {
      this.$Modal.info({
        title: '备注说明',
        content: content
      });
    },
    limitText (content, max) {
      if (max <= 6) {
        max = 6;
      }
      var byteLen = content.getByteLen();
      if (byteLen <= max) {
        return content;
      } else {
        return content.subByte(max-6) + "......";
      }
    },
    changePage (pageNo) {
      window.console.log(11, pageNo)
      // The simulated data is changed directly here, and the actual usage scenario should fetch the data from the server
      this.tableData1 = this.fetchData(pageNo - 1);
    },
    fetchData (currentPage) {
      let params = {
        pointId: this.formValidate.pointId,
        type: this.formValidate.type,
        status: this.formValidate.status,
        financialType: this.formValidate.financialType,
        startTime: this.formValidate.startTime !== '' ?
          formatDate(this.formValidate.startTime, 'yyyy-MM-dd') : '',
        endTime: this.formValidate.endTime !== '' ?
          formatDate(this.formValidate.endTime, 'yyyy-MM-dd') : '',
        begin: currentPage || 0,
        rows: 20
      }
      partnerApi.getBillData(params)
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
