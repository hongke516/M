<template>
  <Card dis-hover>
    <Form ref="formValidate" :model="formValidate" :label-width="80">
      <Row>
        <i-col :span="12">
          <FormItem label="网点" prop="address">
            <i-select style="max-width: 200px" v-model="formValidate.pointId" placeholder="请选择">
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
        <Button type="primary" style="margin-right: 16px;" @click="openAdd()">新建加盟网点</Button>
        <Button type="primary" @click="fetchData()">搜索</Button>
      </i-col>
    </Row>
    <br>
    <div>
      <Table :data="tableData1" :columns="tableColumns1" stripe></Table>
      <div style="margin: 10px;overflow: hidden">
        <div style="float: right;">
          <Page :total="total" show-total :current="1" :page-size="20" @on-change="changePage"></Page>
        </div>
      </div>
    </div>
    <Modal
            v-model="modal1"
            title="新建加盟制网点配置"
            width="800"
            :loading="modalLoading"
            @on-ok="sumbitNewForm"
            >
      <Form ref="newForm" :model="newForm" :rules="newFormRules" :label-width="120">
        <Alert>加盟网点信息</Alert>
        <Row :gutter="32">
          <i-col :span="12">
            <FormItem label="网点" prop="pointId">
              <i-select v-model="newForm.pointId" placeholder="请选择" v-if="mode === 'add'">
                <Option v-for="(point, index) in noAddPointList" :key="index" :value="point.id">{{point.name}}</Option>
              </i-select>
              <Input v-else v-model="newForm.pointName" disabled/>
            </FormItem>
          </i-col>
          <i-col :span="12">
            <FormItem label="合伙人姓名" prop="partnerName">
              <Input v-model="newForm.partnerName" :disabled="mode === 'detail'"/>
            </FormItem>
          </i-col>
        </Row>
        <Row :gutter="32">
          <i-col :span="12">
            <FormItem label="合伙人联系电话" prop="phoneNumber">
              <Input v-model="newForm.phoneNumber" :disabled="mode === 'detail'"/>
            </FormItem>
          </i-col>
        </Row>
        <Alert>派件抽成设置</Alert>
        <Row :gutter="32">
          <i-col :span="12">
            <FormItem style="margin-top: 12px" label="派件抽成/件/元" prop="receiveCommission">
              <i-input v-model="newForm.receiveCommission" :disabled="mode === 'detail'">
                <span slot="append">元</span>
              </i-input>
            </FormItem>
          </i-col>
          <i-col :span="12">
            <Card dis-hover class="import-info">{{newForm.receiveCommission}}元</Card>
          </i-col>
        </Row>
        <Alert>揽件抽成设置</Alert>
        <Row :gutter="32">
          <i-col :span="12">
            <FormItem style="margin-top: 12px" label="揽件抽成/件/元" prop="sendCommission">
              <i-input v-model="newForm.sendCommission" :disabled="mode === 'detail'">
                <span slot="append">元</span>
              </i-input>
            </FormItem>
          </i-col>
          <i-col :span="12">
            <Card dis-hover class="import-info">{{newForm.sendCommission}}元</Card>
          </i-col>
        </Row>
        <Alert>揽派比目标值设置</Alert>
        <Row :gutter="32">
          <i-col :span="12">
            <FormItem style="margin-top: 12px" label="揽派比目标值" prop="sendReceiveRatio">
              <i-input v-model="newForm.sendReceiveRatio" :disabled="mode === 'detail'">
                <span slot="append">元</span>
              </i-input>
            </FormItem>
          </i-col>
          <i-col :span="12">
            <Card dis-hover class="import-info">{{newForm.sendReceiveRatio}}元</Card>
          </i-col>
        </Row>
        <Alert>短信计费配置</Alert>
        <Row :gutter="32">
          <i-col :span="12">
            <FormItem style="margin-top: 12px" label="短信费用/条/元" prop="smsFee">
              <i-input v-model="newForm.smsFee" :disabled="mode === 'detail'">
                <span slot="append">元</span>
              </i-input>
            </FormItem>
          </i-col>
          <i-col :span="12">
            <Card dis-hover class="import-info">{{newForm.smsFee}}元</Card>
          </i-col>
        </Row>
        <Alert>管理费配置</Alert>
        <Row :gutter="32">
          <i-col :span="12">
            <FormItem style="margin-top: 12px" label="管理费用/月/元" prop="managementFee">
              <i-input v-model="newForm.managementFee" :disabled="mode === 'detail'">
                <span slot="append">元</span>
              </i-input>
            </FormItem>
          </i-col>
          <i-col :span="12">
            <Card dis-hover class="import-info">{{newForm.managementFee}}元</Card>
          </i-col>
        </Row>
        <Row>
          <FormItem style="margin-top: 12px" label="管理费扣款月份" prop="managementFeeMonth">
            <Row>
              <span style="margin-right: 4px" v-for="n in 12" :key="n" >
                <Button :type="newForm.managementFeeMonth.split(',').includes(String(n))?'primary':'default'"
                        size="small" @click="mode !== 'detail' && selectMonth(n)">{{n}}月</Button>
              </span>
            </Row>
          </FormItem>
        </Row>
        <Row :gutter="32">
          <i-col :span="12">
            <FormItem label="管理费扣款日期" prop="managementFeeDay">
              <i-select v-model="newForm.managementFeeDay" placeholder="请选择" :disabled="mode === 'detail'">
                <Option v-for="m in 28" :key="m" :value="m">{{m}}号</Option>
              </i-select>
            </FormItem>
          </i-col>
        </Row>
      </Form>
    </Modal>
  </Card>
</template>

<script>
// @ is an alias to /src
import partnerApi from '../../api/partnerApi'
import vtype from '../../libs/vtype'
import {formatDate} from '../../libs/tools'
export default {
  name: 'partnerConfig',
  components: {
  },
  data () {
    return {
      modal1: false,
      modalLoading: true,
      total: 0,
      newForm: {
        pointId: '',
        partnerName: '',
        phoneNumber: '',
        receiveCommission: '',
        sendCommission: '',
        smsFee: '',
        managementFee: '',
        managementFeeMonth: '',
        managementFeeDay: '',
        sendReceiveRatio: ''
      },
      newFormRules: {
        pointId: [
          { type: 'number', required: true, message: '请在列表中选择一项', trigger: 'change' },
        ],
        partnerName: [
          { required: true, message: '请填写', trigger: 'blur' }
        ],
        phoneNumber: [
          { required: true, message: '请填写', trigger: 'blur' },
          { validator: vtype.phone, trigger: 'blur' }
        ],
        receiveCommission: [
          { type: 'number', required: true, message: '请输入符合规范的金额！最多保留3位小数！', trigger: 'blur' },
          { validator: vtype.floatNum3, message: '请输入符合规范的金额！最多保留3位小数！', trigger: 'blur' }
        ],
        sendCommission: [
          { type: 'number', required: true, message: '请输入符合规范的金额！最多保留3位小数！', trigger: 'blur' },
          { validator: vtype.floatNum3, message: '请输入符合规范的金额！最多保留3位小数！',trigger: 'blur' }
        ],
        smsFee: [
          { type: 'number', required: true, message: '请输入符合规范的金额！最多保留3位小数！', trigger: 'blur' },
          { validator: vtype.floatNum3, message: '请输入符合规范的金额！最多保留3位小数！',trigger: 'blur' }
        ],
        managementFee: [
          { type: 'number', required: true, message: '请输入符合规范的金额！最多保留3位小数！', trigger: 'blur' },
          { validator: vtype.floatNum3, message: '请输入符合规范的金额！最多保留3位小数！',trigger: 'blur, change' }
        ],
        managementFeeMonth: [
          { required: true, message: '请输入符合规范的金额！最多保留3位小数！', trigger: 'blur, change' }
        ],
        sendReceiveRatio: [
          { type: 'number', required: true, message: '请输入符合规范的金额！最多保留3位小数！', trigger: 'blur' },
          { validator: vtype.floatNum3, message: '请输入符合规范的金额！最多保留3位小数！',trigger: 'blur, change' }
        ],
        managementFeeDay: [
          { type: 'number', required: true, message: '请输入', trigger: 'change' },
        ]
      },
      formValidate: {
        pointId: '',
        updateEndTime: '',
        updateStartTime: ''
      },
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
        },
        {
          title: '操作',
          width: 300,
          key: 'action',
          render: (h, params) => {
            return h('div', [
              h('Button', {
                style: {'margin-right': '4px'},
                props: {
                  type: 'primary',
                  size: 'small'
                },
                on: {
                  click: () => {
                    this.editOrDetailForm(params)
                  }
                }
              }, '修改'),
              h('Button', {
                style: {'margin-right': '4px'},
                props: {
                  type: params.row.isCharging ? 'error' : 'success',
                  size: 'small'
                },
                on: {
                  click: () => {
                    this.switchCharging(params)
                  }
                }
              }, params.row.isCharging ? '计费禁用' : '计费开启'),
              h('Button', {
                style: {'margin-right': '4px'},
                props: {
                  type: params.row.isBalanceCheck ? 'error' : 'success',
                  size: 'small'
                },
                on: {
                  click: () => {
                    this.switchBalanceCheck(params)
                  }
                }
              }, params.row.isBalanceCheck ? '余额校验禁用' : '余额校验开启'),
              h('Button', {
                style: {'margin-right': '4px'},
                props: {
                  type: 'primary',
                  size: 'small'
                },
                on: {
                  click: () => {
                    this.editOrDetailForm(params, 'detail')

                  }
                }
              }, '详情')
            ]);
          }
        }
      ],
      addedPointList: [],
      noAddPointList: [],
      mode: '',
      editRaw: {}
    }
  },
  watch: {
    newForm: {
      handler: (val, oldval) => {
        window.console.log(val, oldval)
      },
      deep:true
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
    changePage (pageNo) {
      window.console.log(11, pageNo)
      // The simulated data is changed directly here, and the actual usage scenario should fetch the data from the server
      this.tableData1 = this.fetchData(pageNo - 1);
    },
    selectMonth (month) {
      window.console.log('select', month, this.newForm.managementFeeMonth.includes(month))
      if (this.newForm.managementFeeMonth.includes(month)) {
        this.newForm.managementFeeMonth = this.newForm.managementFeeMonth.split(',').filter(m => Number(m) !== month).join(',')
      } else {
        let list = this.newForm.managementFeeMonth.length ?
          this.newForm.managementFeeMonth.split(',') : []
        window.console.log(list)
        list.push(String(month))
        this.newForm.managementFeeMonth = list.sort((a, b) => {return Number(a) - Number(b)}).join(',')
      }
      window.console.log(this.newForm.managementFeeMonth)
      this.$refs.newForm.validateField('managementFeeMonth')
    },
    initNewPoint () {
      this.newForm = {
        pointId: '',
        partnerName: '',
        phoneNumber: '',
        receiveCommission: '',
        sendCommission: '',
        smsFee: '',
        managementFee: '',
        managementFeeMonth: '',
        managementFeeDay: '',
        sendReceiveRatio: ''
      }
      this.$nextTick(() => {
        this.$refs.newForm.resetFields()
      })
    },
    openAdd () {
      this.mode = 'add'
      partnerApi.getNoAddPointList()
        .then(response => {
          window.console.log(response)
          this.initNewPoint()
          this.noAddPointList = response.object || []
          this.modal1 = true
          this.modalLoading = true
        }).catch((err)=>{
          window.console.log(err)
        })
    },
    editOrDetailForm (scope, mode) {
      window.console.log(scope)
      this.mode = mode || 'edit'
      Object.assign(this.editRaw, scope.row)
      for(let key in this.newForm) {
        this.newForm[key] = scope.row[key]
      }
      this.newForm.pointName = scope.row.pointName
      this.modal1 = true
    },
    switchCharging (scope) {
      partnerApi.switchCharging({id: scope.row.id, status: scope.row.isCharging ? 0 : 1})
        .then(response => {
          if (response.status === 'success') {
            this.$Message.success('修改成功!');
            this.fetchData()
          } else {
            this.$Message.error(response.message);
          }
        }).catch((err)=>{
        window.console.log(err)
        this.$Message.error(err);
      })
    },
    switchBalanceCheck (scope) {
      partnerApi.switchBalanceCheck({id: scope.row.id, status: scope.row.isBalanceCheck ? 0 : 1})
        .then(response => {
          if (response.status === 'success') {
            this.$Message.success('修改成功!');
            this.fetchData()
          } else {
            this.$Message.error(response.message);
          }
        }).catch((err)=>{
        window.console.log(err)
        this.$Message.error(err);
      })
    },
    fetchData (currentPage) {
      let params = {
        pointId: this.formValidate.pointId,
        updateStartTime: this.formValidate.updateStartTime !== '' ?
          formatDate(this.formValidate.updateStartTime, 'yyyy-MM-dd') : '',
        updateEndTime: this.formValidate.updateEndTime !== '' ?
          formatDate(this.formValidate.updateEndTime, 'yyyy-MM-dd') : '',
        begin: currentPage || 0,
        isDeleted: 0,
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
    },
    updatePoint () {
      let postData = Object.assign(this.editRaw, this.newForm)
      partnerApi.updatePartnerPoint(postData)
        .then(response => {
          if (response.status === 'success') {
            this.$Message.success('修改成功!');
            this.modal1 = false
            this.fetchData()
          } else {
            this.$Message.error(response.message);
          }
        }).catch((err)=>{
        window.console.log(err)
        this.$Message.error(err);
      })
    },
    addPoint () {
      partnerApi.addPartnerPoint(this.newForm)
        .then(response => {
          if (response.status === 'success') {
            this.$Message.success('添加成功!');
            this.modal1 = false
            this.fetchData()
          } else {
            this.$Message.error(response.message);
          }
        }).catch((err)=>{
          window.console.log(err)
          this.$Message.error(err);
        })
    },
    sumbitNewForm () {
      this.$refs.newForm.validate((valid) => {
        window.console.log(222)
        if (valid) {
          if (this.mode === 'add') {
            this.addPoint()
          } else {
            this.updatePoint()
          }
        } else {
          this.$Message.error('Fail!');
          this.modalLoading = false
          this.$nextTick(() => {
            this.modalLoading = true
          })
        }
      })
    }
  }
}
</script>
<style scoped lang="less">
  @import "../../theme/var.less";
  .import-info{
    box-shadow: 0 1px 6px @info-color !important;
    border-color: #eee;
    color: @error-color;
    font-size: 14px;
  }
</style>
