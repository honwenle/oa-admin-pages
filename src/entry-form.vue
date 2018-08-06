<template>
  <el-form :model="formData" :rules="rules" ref="ruleForm" label-width="140px" class="demo-formData">
    <el-form-item v-show="false" label="员工ID" prop="resourceId">
      <el-input v-model="formData.resourceId"></el-input>
    </el-form-item>
    <el-form-item label="姓名" prop="lastName">
      <el-input v-model="formData.lastName" :disabled="isComplete"></el-input>
    </el-form-item>
    <el-form-item label="邮箱" prop="email">
      <el-input v-model="formData.email" :disabled="isComplete"></el-input>
    </el-form-item>
    <el-form-item label="手机" prop="mobile">
      <el-input v-model="formData.mobile" :disabled="isComplete"></el-input>
    </el-form-item>
    <el-form-item label="性别" prop="sex">
      <el-radio-group v-model="formData.sex" :disabled="isComplete">
        <el-radio :label="0">男</el-radio>
        <el-radio :label="1">女</el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="分部" prop="subCompany">
      <el-select v-model="formData.subCompany" placeholder="请选择分部" style="width: 100%;" @change="getDepartmentList" :disabled="isComplete">
        <el-option v-for="(item, i) in subCompanyList" :key="i" :label="item.subcompanyname" :value="item.id"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="部门" prop="department">
      <el-select v-model="formData.department" placeholder="请选择部门" style="width: 100%;" :disabled="isComplete">
        <el-option v-for="(item, i) in departmentList" :key="i" :label="item.departmentmark" :value="item.id"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="职务类型" prop="jobGroup">
      <el-select v-model="formData.jobGroup" placeholder="请选择职务类型" style="width: 100%;" @change="getJobActivityList" :disabled="isComplete">
        <el-option v-for="(item, i) in jobGroupList" :key="i" :label="item.label" :value="item.id"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="职务" prop="jobActivity">
      <el-select v-model="formData.jobActivity" placeholder="请选择职务" style="width: 100%;" @change="getJobTitleList" :disabled="isComplete">
        <el-option v-for="(item, i) in jobActivityList" :key="i" :label="item.label" :value="item.id"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="岗位" prop="jobTitle">
      <el-select v-model="formData.jobTitle" placeholder="请选择岗位" style="width: 100%;" :disabled="isComplete">
        <el-option v-for="(item, i) in jobTitleList" :key="i" :label="item.label" :value="item.id"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="审核地点" prop="locationId">
      <el-select v-model="formData.locationId" placeholder="请选择工作地点" style="width: 100%;" :disabled="isComplete">
        <el-option v-for="item in locationIdList" :key="item.id" :label="item.locationname" :value="item.id"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="直接上级" prop="managerId">
      <name-search v-model="formData.managerId" :namecn="formData.managerName"></name-search>
    </el-form-item>
    <el-form-item label="入职日期" prop="employmentDate">
      <el-date-picker type="date" placeholder="选择日期" v-model="formData.employmentDate" style="width: 100%;" :disabled="isComplete"></el-date-picker>
    </el-form-item>
    <el-form-item label="试用期工资" prop="wageProbationMin">
      <el-input v-model="formData.wageProbationMin" style="width:45%" :disabled="isComplete"></el-input>
      <span>-</span>
      <el-input v-model="formData.wageProbationMax" style="width:45%" :disabled="isComplete"></el-input>
    </el-form-item>
    <el-form-item label="转正工资" prop="wageRegularMin">
      <el-input v-model="formData.wageRegularMin" style="width:45%" :disabled="isComplete"></el-input>
      <span>-</span>
      <el-input v-model="formData.wageRegularMax" style="width:45%" :disabled="isComplete"></el-input>
    </el-form-item>
    <el-form-item label="员工号" prop="workCode">
      <el-input v-model="formData.workCode" :disabled="isComplete"></el-input>
    </el-form-item>
    <el-form-item label="安全级别" prop="secLevel">
      <el-input v-model="formData.secLevel" :disabled="isComplete"></el-input>
    </el-form-item>
    <el-form-item label="生日日期" prop="birthday">
      <el-date-picker type="date" placeholder="选择日期" v-model="formData.birthday" :disabled="isComplete" style="width: 100%;"></el-date-picker>
    </el-form-item>
    <el-form-item label="身份证号" prop="idcard">
      <el-input v-model="formData.idcard" :disabled="isComplete"></el-input>
    </el-form-item>
    <el-form-item label="最高学历" prop="higestEducation">
      <el-select v-model="formData.higestEducation" :disabled="isComplete" placeholder="请选择">
        <el-option v-for="(item, i) in ['小学', '初中', '高中', '大专', '本科', '博士', '硕士', '教授']" :key="i" :value="i" :label="item"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="民族" prop="nation">
      <el-select v-model="formData.nation" filterable placeholder="可输入关键词">
        <el-option
          v-for="item in nationData"
          :key="item.id"
          :value="item.name">
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="籍贯" prop="nativePlaceMark">
      <el-cascader
        placeholder="可输入关键词"
        :options="cityData"
        filterable
        v-model="formData.nativePlaceMark"
        :props="cityCascaderProps"
      ></el-cascader>
    </el-form-item>
    <el-form-item label="婚姻状态" prop="maritalStatus">
      <el-select v-model="formData.maritalStatus" :disabled="isComplete" placeholder="请选择">
        <el-option :value="0" label="已婚"></el-option>
        <el-option :value="1" label="未婚"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="居住地" prop="addressMark">
      <el-cascader
        placeholder="可输入关键词"
        :options="cityData"
        filterable
        v-model="formData.addressMark"
        :props="cityCascaderProps"
      ></el-cascader>
    </el-form-item>
    <el-form-item label="详细街道" prop="addressDetail">
      <el-input v-model="formData.addressDetail"></el-input>
    </el-form-item>
    <el-form-item label="政治面貌" prop="politicalStatus">
      <el-select v-model="formData.politicalStatus" placeholder="请选择">
        <el-option value="群众" />
        <el-option value="团员" />
        <el-option value="中国党员" />
        <el-option value="其他党派" />
      </el-select>
    </el-form-item>
    <el-form-item label="健康状况" prop="healthCondition">
      <el-select v-model="formData.healthCondition" placeholder="请选择">
        <el-option v-for="(item, i) in ['优秀', '良好', '一般', '较差']" :key="i" :value="i" :label="item"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="驾照" prop="drivingLicense">
      <el-select v-model="formData.drivingLicense" :disabled="isComplete" placeholder="请选择">
        <el-option v-for="(item, i) in ['C1', 'C2', '无']" :key="i" :value="i" :label="item"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="身高(cm)" prop="height">
      <el-input v-model="formData.height"></el-input>
    </el-form-item>
    <el-form-item label="体重(kg)" prop="weight">
      <el-input v-model="formData.weight"></el-input>
    </el-form-item>
    <el-form-item label="微信或QQ" prop="wechatOrQq">
      <el-input v-model="formData.wechatOrQq" :disabled="isComplete"></el-input>
    </el-form-item>
    <el-form-item label="兴趣爱好" prop="hobbies">
      <el-input v-model="formData.hobbies"></el-input>
    </el-form-item>
    <!-- 参考OA流程补充字段 -->
    <el-form-item label="技能证书" prop="certificate">
      <el-input v-model="formData.certificate" :disabled="isComplete"></el-input>
    </el-form-item>
    <el-form-item label="期望薪资" prop="expectWage">
      <el-input v-model="formData.expectWage" :disabled="isComplete"></el-input>
    </el-form-item>
    <el-form-item label="面试日期" prop="interviewDate">
      <el-date-picker v-model="formData.interviewDate" :disabled="isComplete"></el-date-picker>
    </el-form-item>
    <el-form-item label="来源" prop="source">
      <el-select v-model="formData.source" :disabled="isComplete" placeholder="请选择">
        <el-option v-for="(item, i) in ['报纸', '网络', '经人介绍', '现场招聘']" :key="i" :value="i" :label="item"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="其他途径" prop="otherSource">
      <el-input v-model="formData.otherSource" :disabled="isComplete"></el-input>
    </el-form-item>
    <el-form-item label="其他要求" prop="otherRequire">
      <el-input v-model="formData.otherRequire" :disabled="isComplete"></el-input>
    </el-form-item>
    <el-form-item label="是否有亲友" prop="haveFriend">
      <el-switch
        :disabled="isComplete"
        v-model="formData.haveFriend"
        :active-value="0"
        :inactive-value="1">
      </el-switch>
    </el-form-item>
    <el-form-item label="亲友关系" prop="friendRelation">
      <el-input v-model="formData.friendRelation" :disabled="isComplete"></el-input>
    </el-form-item>
    <el-form-item label="亲友职务" prop="friendJob">
      <el-input v-model="formData.friendJob" :disabled="isComplete"></el-input>
    </el-form-item>
    <el-form-item label="是否接受其他岗位" prop="isAcceptJob">
      <el-switch
        :disabled="isComplete"
        v-model="formData.isAcceptJob"
        :active-value="0"
        :inactive-value="1">
      </el-switch>
    </el-form-item>
    <el-form-item label="可接受岗位" prop="acceptjob">
      <el-input v-model="formData.acceptjob"></el-input>
    </el-form-item>
    <el-form-item label="是否有疾病" prop="isIll">
      <el-switch
        :disabled="isComplete"
        v-model="formData.isIll"
        :active-value="0"
        :inactive-value="1">
      </el-switch>
    </el-form-item>
    <el-form-item label="疾病情况" prop="illCondition">
      <el-input v-model="formData.illCondition" :disabled="isComplete"></el-input>
    </el-form-item>
    <el-form-item label="自我评价" prop="evaluate">
      <el-input v-model="formData.evaluate" :disabled="isComplete"></el-input>
    </el-form-item>
    <!-- /参考OA流程补充字段 -->
    <div class="dynamic">
      <div class="dynamic-flex">
        <div class="dynamic-title">
          家庭成员
          <i class="el-icon-circle-plus-outline"
            style="color: #67C23A" 
            @click="addFamilyForm"/>
        </div>
        <div class="dynamic-label">姓名</div>
        <div class="dynamic-label">联系方式</div>
        <div class="dynamic-label">关系</div>
      </div>
      <el-form-item
        v-for="(item, index) in formData.exHrmFamilies"
        :key="index"
        :prop="'exHrmFamilies.'+index">
        <el-input v-model="item.name"></el-input>
        <el-input v-model="item.contact"></el-input>
        <el-input v-model="item.relationship"></el-input>
        <i class="el-icon-remove-outline"
          @click.prevent="removeFamilyForm(item)"
          style="color: #F56C6C"></i>
      </el-form-item>
    </div>
    <div class="dynamic">
      <div class="dynamic-flex">
        <div class="dynamic-title">
          教育背景
          <i class="el-icon-circle-plus-outline"
            style="color: #67C23A" 
            @click="addForm"/>
        </div>
        <div class="dynamic-label">开始时间</div>
        <div class="dynamic-label">结束时间</div>
        <div class="dynamic-label">教育机构</div>
        <div class="dynamic-label">专业</div>
      </div>
      <el-form-item
        v-for="(item, index) in formData.exHrmEducation"
        :key="index"
        :prop="'exHrmEducation.'+index">
        <el-date-picker type="date" v-model="item.beginDate" />
        <el-date-picker type="date" v-model="item.endDate" />
        <el-input v-model="item.educationOrganization"></el-input>
        <el-input v-model="item.major"></el-input>
        <i class="el-icon-remove-outline"
          @click.prevent="removeForm(item)"
          style="color: #F56C6C"></i>
      </el-form-item>
    </div>
    <div class="dynamic">
      <div class="dynamic-flex">
        <div class="dynamic-title">
          工作经历
          <i class="el-icon-circle-plus-outline"
            style="color: #67C23A" 
            @click="addWorkForm"/>
        </div>
        <div class="dynamic-label">任职开始时间</div>
        <div class="dynamic-label">任职结束时间</div>
        <div class="dynamic-label">任职单位</div>
        <div class="dynamic-label">所在岗位</div>
        <div class="dynamic-label">离职原因</div>
        <div class="dynamic-label">最后薪资</div>
        <div class="dynamic-label">证明人/电话</div>
      </div>
      <el-form-item
        v-for="(item, index) in formData.exHrmWorks"
        :key="index"
        :prop="'exHrmWorks.'+index">
        <el-date-picker type="date" v-model="item.beginDate" />
        <el-date-picker type="date" v-model="item.endDate" />
        <el-input v-model="item.company"></el-input>
        <el-input v-model="item.job"></el-input>
        <el-input v-model="item.leaveReason"></el-input>
        <el-input v-model="item.wage"></el-input>
        <el-input v-model="item.referencePhone"></el-input>
        <i class="el-icon-remove-outline"
          @click.prevent="removeWorkForm(item)"
          style="color: #F56C6C"></i>
      </el-form-item>
    </div>
    <el-row>
      <el-button type="primary" @click="submitForm('ruleForm')" :loading="posting">保存</el-button>
      <el-button type="primary" v-show="!baseButton" @click="confirm" :loading="posting">审核通过</el-button>
      <el-button type="primary" v-show="!baseButton" @click="approval" :loading="posting">开设账号</el-button>
    </el-row>
  </el-form>
</template>

<script>
import departMixin from '@/mixins/depart'
import NameSearch from '@/components/name-search'
import cityData from './json/city'
import nationData from './json/nation'
export default {
  mixins: [departMixin],
  components: {
    NameSearch
  },
  data() {
    return {
      posting: false,
      jobGroupList: [],
      jobActivityList: [],
      jobTitleList: [],
      locationIdList: [],
      formData: {},
      rules: {
        resourceId: {required: true, message: '此项必填'},
        lastName: {required: true, message: '此项必填'},
        subCompany: {required: true, message: '此项必填'},
        department: {required: true, message: '此项必填'},
        jobTitle: {required: true, message: '此项必填'},
        jobActivity: {required: true, message: '此项必填'},
        jobGroup: {required: true, message: '此项必填'},
        managerId: {required: true, message: '此项必填'},
        sex: {required: true, message: '此项必填'},
        birthday: {required: true, message: '此项必填'},
        mobile: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { pattern: /^1[34578]\d{9}$/, message: '目前只支持中国大陆的手机号码' }
        ],
        email: [
          { required: true, message: '请输入邮箱地址', trigger: 'blur' },
          { type: 'email', message: '请输入正确的邮箱地址', trigger: 'change' }
        ],
        maritalStatus: {required: true, message: '此项必填'},
        locationId: {required: true, message: '此项必填'},
        employmentDate: {required: true, message: '此项必填'},
        higestEducation: {required: true, message: '此项必填'},
        drivingLicense: {required: true, message: '此项必填'},
        idcard: {required: true, message: '此项必填'},
        wechatOrQq: {required: true, message: '此项必填'},
        certificate: {required: true, message: '此项必填'},
        expectWage: {required: true, message: '此项必填'},
        nativePlaceMark: {required: true, message: '此项必填'},
        addressMark: {required: true, message: '此项必填'},
        addressDetail: {required: true, message: '此项必填'},
        source: {required: true, message: '此项必填'},
        otherRequire: {required: true, message: '此项必填'},
        haveFriend: {required: true, message: '此项必填'},
        isAcceptJob: {required: true, message: '此项必填'},
        isIll: {required: true, message: '此项必填'},
        evaluate: {required: true, message: '此项必填'},
        secLevel: {required: this.isComplete, message: '此项必填'},
        nation: {required: this.isComplete, message: '此项必填'},
        weight: {required: this.isComplete, message: '此项必填'},
        politicalStatus: {required: this.isComplete, message: '此项必填'},
        healthCondition: {required: this.isComplete, message: '此项必填'},
        height: {required: this.isComplete, message: '此项必填'},
        hobbies: {required: this.isComplete, message: '此项必填'},
        educational: {required: this.isComplete, message: '此项必填'},
        exHrmEducation: {required: this.isComplete, message: '此项必填'},
        exHrmFamilies: {required: this.isComplete, message: '此项必填'}
      },
      nationData: nationData,
      cityData: cityData,
      cityCascaderProps: {
        value: 'label'
      }
    }
  },
  props: {
    id: {
      type: Number,
      default: 0
    },
    isComplete: {
      type: Boolean,
      default: false
    },
    token: {
      type: String,
      default: ''
    },
    baseButton: {
      type: Boolean,
      default: true
    }
  },
  async mounted() {
    await this.getDetail()
    this.getJobGroupList()
    this.getSubCompanyList()
    this.getLocationIdList()
  },
  methods: {
    async getLocationIdList() {
      let {data} = await this.$http({
        url: '/rest/locations'
      })
      if (data.code == 200) {
        this.locationIdList = data.data
      }
    },
    async getJobTitleList(id) {
      let {data} = await this.$http({
        url: '/rest/jobTitles',
        params: {
          activityId: id
        }
      })
      if (data.code == 200) {
        this.jobTitleList = data.data
        // this.formData.jobTitle = null
      }
    },
    async getJobActivityList(id) {
      let {data} = await this.$http({
        url: '/rest/jobActivities',
        params: {
          groupId: id
        }
      })
      if (data.code == 200) {
        this.jobActivityList = data.data
        // this.formData.jobActivity = null
      }
      this.id && this.getJobTitleList(this.formData.jobActivity)
    },
    async getJobGroupList() {
      let {data} = await this.$http({
        url: '/rest/jobGroups'
      })
      if (data.code == 200) {
        this.jobGroupList = data.data
      }
      this.id && this.getJobActivityList(this.formData.jobGroup)
    },
    async getDetail() {
      let {data} = await this.$http({
        url: '/rest/resource/exDetail',
        params: {
          id: this.id
        }
      })
      if (data.code == 200) {
        data.data.nativePlaceMark = data.data.nativePlaceMark || []
        data.data.addressMark = data.data.addressMark || []
        data.data.haveFriend = data.data.haveFriend || 0
        data.data.isAcceptJob = data.data.isAcceptJob || 0
        data.data.isIll = data.data.isIll || 0
        this.formData = data.data
        this.initDynamic()
      }
    },
    initDynamic() {
      if (this.formData.exHrmWorks.length < 1) {
        this.addWorkForm()
      }
      if (this.formData.exHrmFamilies.length < 1) {
        this.addFamilyForm()
      }
      if (this.formData.exHrmEducation.length < 1) {
        this.addForm()
      }
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.isComplete ? this.postCompleteForm() : this.postForm()
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    async postCompleteForm() {
      this.formData.token = this.token
      let {data} = await this.$http({
        method: 'put',
        url: '/rest/resource/completion',
        data: this.formData
      })
      if (data.code == 200) {
        this.$message({
          message: '执行成功！',
          type: 'success'
        });
      } else {
        this.$message.error(data.message);
      }
    },
    async postForm() {
      this.posting = true
      let {data} = await this.$http({
        method: this.id ? 'put' : 'post',
        url: '/rest/resource',
        data: this.formData
      })
      if (data.code == 200) {
        this.$message({
          message: '执行成功！',
          type: 'success'
        });
        this.$emit('close-from-child')
      } else {
        this.$message.error(data.message);
      }
      this.posting = false
    },
    async approval() {
      this.posting = true
      let {data} = await this.$http({
        method: 'post',
        url: '/rest/resource/qualification',
        data: {
          resourceId: this.id,
          workCode: this.formData.workCode
        }
      })
      if (data.code == 200) {
        this.$message({
          message: '执行成功！',
          type: 'success'
        });
        this.$emit('close-from-child')
      } else {
        this.$message.error(data.message);
      }
      this.posting = false
    },
    async confirm() {
      this.posting = true
      let {data} = await this.$http({
        method: 'put',
        url: '/rest/resource/confirm',
        data: {
          resourceId: this.id
        }
      })
      if (data.code == 200) {
        this.$message({
          message: '执行成功！',
          type: 'success'
        });
        this.$emit('close-from-child')
      } else {
        this.$message.error(data.message);
      }
      this.posting = false
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    addForm() {
      this.formData.exHrmEducation.push({
        educationId: '',
        resourceId: this.id,
        beginDate: null,
        endDate: null,
        educationOrganization: '',
        major: '',
        status: 0,
        updateDate: null,
        createDate: Date.now(),
        key: Date.now()
      });
    },
    removeForm(item) {
      var index = this.formData.exHrmEducation.indexOf(item)
      if (index !== -1) {
        this.formData.exHrmEducation.splice(index, 1)
      }
    },
    addFamilyForm() {
      this.formData.exHrmFamilies.push({
        familyId: '',
        name: '',
        contact: '',
        relationship: ''
      });
    },
    removeFamilyForm(item) {
      var index = this.formData.exHrmFamilies.indexOf(item)
      if (index !== -1) {
        this.formData.exHrmFamilies.splice(index, 1)
      }
    },
    addWorkForm() {
      this.formData.exHrmWorks.push({
        beginDate: '',
        endDate: '',
        company: '',
        job: '',
        leaveReason: '',
        wage: '',
        referencePhone: ''
      });
    },
    removeWorkForm(item) {
      var index = this.formData.exHrmWorks.indexOf(item)
      if (index !== -1) {
        this.formData.exHrmWorks.splice(index, 1)
      }
    }
  }
}
</script>
