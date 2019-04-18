<template>
  <Card dis-hover>
    <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :inline="true" :label-width="80">
      <FormItem label="网点" prop="address">
        <i-select v-model="formValidate.address" placeholder="Select your city">
          <Option value="beijing">New York</Option>
          <Option value="shanghai">London</Option>
          <Option value="shenzhen">Sydney</Option>
        </i-select>
      </FormItem>
      <FormItem label="Date">
        <FormItem prop="date">
          <DatePicker type="daterange" placeholder="Select date" v-model="formValidate.daterange"></DatePicker>
        </FormItem>
      </FormItem>
      <FormItem>
        <Button type="primary">搜索</Button>
      </FormItem>
    </Form>
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

export default {
  name: 'partnerConfigRecord',
  components: {
  },
  data () {
    return {
      formValidate: {
        address: '',
        daterange: ''
      },
      tableData1: this.mockTableData1(),
      tableColumns1: [
        {
          type: 'index',
          width: 50,
          align: 'center',
          title: '序号'
        },
        {
          title: '更新时间',
          key: 'name'
        },
        {
          title: '网点',
          key: 'name'
        },
        {
          title: '派件抽成/件/元',
          key: 'name'
        },
        {
          title: '揽件抽成/件/元',
          key: 'name'
        },
        {
          title: '揽派比目标',
          key: 'name'
        },
        {
          title: '短信收费/条/元',
          key: 'name'
        },
        {
          title: '管理费用/月/元',
          key: 'name'
        },
        {
          title: '管理费扣款日期',
          key: 'name'
        },
        {
          title: '管理费扣款月份',
          key: 'name'
        },
        {
          title: '合伙人姓名',
          key: 'name'
        },
        {
          title: '合伙人联系电话',
          key: 'name'
        },
        {
          title: '操作人',
          key: 'name'
        }
      ]
    }
  },
  methods: {
    mockTableData1 () {
      let data = [];
      for (let i = 0; i < 10; i++) {
        data.push({
          name: 'Business' + Math.floor(Math.random () * 100 + 1),
          update: new Date()
        })
      }
      return data;
    },
    formatDate (date) {
      const y = date.getFullYear();
      let m = date.getMonth() + 1;
      m = m < 10 ? '0' + m : m;
      let d = date.getDate();
      d = d < 10 ? ('0' + d) : d;
      return y + '-' + m + '-' + d;
    },
    changePage () {
      // The simulated data is changed directly here, and the actual usage scenario should fetch the data from the server
      this.tableData1 = this.mockTableData1();
    },
    handleSubmit (name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.$Message.success('Success!');
        } else {
          this.$Message.error('Fail!');
        }
      })
    },
    handleReset (name) {
      this.$refs[name].resetFields();
    }
  }
}
</script>
