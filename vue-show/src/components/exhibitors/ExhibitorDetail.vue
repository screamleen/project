<template>
  <div>
    <div class="container-fluid">
      <h1 class="page-title" v-if="isAdd">新增参展人员
        <small>
          <router-link :to="'/exhibitors'">
            <el-button type="text">返回</el-button>
          </router-link>
        </small>
      </h1>
      <h1 class="page-title" v-else>{{ currentExhibitor.name }}的个人信息
        <router-link :to="'/exhibitors'">
          <el-button type="text">返回</el-button>
        </router-link>
      </h1>
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>基本信息</span>
          <el-button style="float: right; padding: 3px 0" type="text"></el-button>
        </div>
        <div class="el-table el-table--fit el-table--border el-table--group el-table--enable-row-hover el-table--enable-row-transition">
          <div class="el-table__header-wrapper">
            <el-form :model="details.base" :rules="rules.base" ref="baseForm" :show-message="false">
              <table cellspacing="0" cellpadding="0" border="" class="el-table__header" style="width: 100%;">
                <thead>
                  <tr >
                    <th colspan="1">
                      <span>姓名（中文）</span>
                    </th>
                    <th colspan="2">
                      <div class="vertical-middle-first"></div
                      ><div class="vertical-middle-el line-input-container">
                        <div class="vertical-middle-first"></div
                        ><el-form-item prop="name">
                          <el-input class="vertical-middle-el" v-model="details.base.name" placeholder="姓名" v-on:blur="fieldValidate('baseForm','name')">
                            <template slot="append">
                              <div class="input-line"></div>
                              <div class="input-error" v-show="errors.name">
                                <el-tooltip class="item" effect="dark" :content="errors.name" placement="top">
                                  <i class="el-icon-error"></i>
                                </el-tooltip>
                              </div>
                            </template>
                          </el-input>
                        </el-form-item>
                      </div>
                    </th>
                    <th colspan="1">身份证号</th>
                    <th colspan="2">
                      <div class="vertical-middle-first"></div
                      ><div class="vertical-middle-el line-input-container">
                        <div class="vertical-middle-first"></div
                        ><el-form-item prop="id_card">
                          <el-input v-model="details.base.id_card" placeholder="身份证号" v-on:blur="fieldValidate('baseForm','id_card')">
                            <template slot="append">
                              <div class="input-line"></div>
                              <div class="input-error" v-show="errors.id_card">
                                <el-tooltip class="item" effect="dark" :content="errors.id_card" placement="top">
                                  <i class="el-icon-error"></i>
                                </el-tooltip>
                              </div>
                            </template>
                          </el-input>
                        </el-form-item>
                      </div>
                    </th>
                    <th colspan="1">出生日期</th>
                    <th colspan="2">
                      <el-date-picker
                        v-model="details.base.birth_date"
                        type="date"
                        placeholder="选择日期"
                        format="yyyy 年 MM 月 dd 日">
                      </el-date-picker>
                    </th>
                  </tr>
                  <tr>
                    <th colspan="1">性别</th>
                    <th colspan="2">
                      <el-radio-group v-model="details.base.sex">
                        <el-radio :label="'男'">男</el-radio>
                        <el-radio :label="'女'">女</el-radio>
                      </el-radio-group>
                    </th>
                    <th colspan="1">中文职务</th>
                    <th colspan="2">
                      <div class="vertical-middle-first"></div
                      ><div class="vertical-middle-el line-input-container">
                        <div class="vertical-middle-first"></div
                        ><el-input v-model="details.base.duty" placeholder="中文职务">
                          <template slot="append">
                            <div class="input-line"></div>
                          </template>
                        </el-input>
                      </div>
                    </th>
                    <th colspan="1">手机</th>
                    <th colspan="2">
                      <div class="vertical-middle-first"></div
                      ><div class="vertical-middle-el line-input-container">
                        <div class="vertical-middle-first"></div
                        ><el-form-item prop="telphone">
                          <el-input v-model="details.base.telphone" placeholder="手机" v-on:blur="fieldValidate('baseForm','telphone')">
                            <template slot="append">
                              <div class="input-line"></div>
                              <div class="input-error" v-show="errors.telphone">
                                <el-tooltip class="item" effect="dark" :content="errors.telphone" placement="top">
                                  <i class="el-icon-error"></i>
                                </el-tooltip>
                              </div>
                            </template>
                          </el-input>
                        </el-form-item>
                      </div>
                    </th>
                  </tr>
                  <tr>
                    <th colspan="1">邮箱</th>
                    <th colspan="2">
                      <div class="vertical-middle-first"></div
                      ><div class="vertical-middle-el line-input-container">
                        <div class="vertical-middle-first"></div
                        ><el-form-item prop="email">
                          <el-input v-model="details.base.email" placeholder="邮箱" v-on:blur="fieldValidate('baseForm','email')">
                            <template slot="append">
                              <div class="input-line"></div>
                              <div class="input-error" v-show="errors.email">
                                <el-tooltip class="item" effect="dark" :content="errors.email" placement="top">
                                  <i class="el-icon-error"></i>
                                </el-tooltip>
                              </div>
                            </template>
                          </el-input>
                        </el-form-item>
                      </div>
                    </th>
                    <th colspan="1">联系电话</th>
                    <th colspan="2">
                      <div class="vertical-middle-first"></div
                      ><div class="vertical-middle-el line-input-container">
                      <div class="vertical-middle-first"></div
                        ><el-input v-model="details.base.mobile" placeholder="联系电话">
                          <template slot="append">
                            <div class="input-line"></div>
                          </template>
                        </el-input>
                      </div>
                    </th>
                    <th colspan="1"></th>
                    <th colspan="2"></th>
                  </tr>
                  <tr>
                    <th colspan="1">传真</th>
                    <th colspan="2">
                      <div class="vertical-middle-first"></div
                      ><div class="vertical-middle-el line-input-container">
                        <div class="vertical-middle-first"></div
                        ><el-form-item prop="fex">
                          <el-input v-model="details.base.fex" placeholder="传真" v-on:blur="fieldValidate('baseForm','fex')">
                            <template slot="append">
                              <div class="input-line"></div>
                              <div class="input-error" v-show="errors.fex">
                                <el-tooltip class="item" effect="dark" :content="errors.fex" placement="top">
                                  <i class="el-icon-error"></i>
                                </el-tooltip>
                              </div>
                            </template>
                          </el-input>
                        </el-form-item>
                      </div>
                    </th>
                    <th colspan="1">QQ</th>
                    <th colspan="2">
                      <div class="vertical-middle-first"></div
                      ><div class="vertical-middle-el line-input-container">
                        <div class="vertical-middle-first"></div
                        ><el-form-item prop="qq">
                          <el-input v-model="details.base.qq" placeholder="QQ" v-on:blur="fieldValidate('baseForm','qq')">
                            <template slot="append">
                              <div class="input-line"></div>
                              <div class="input-error" v-show="errors.qq">
                                <el-tooltip class="item" effect="dark" :content="errors.qq" placement="top">
                                  <i class="el-icon-error"></i>
                                </el-tooltip>
                              </div>
                            </template>
                          </el-input>
                        </el-form-item>
                      </div>
                    </th>
                    <th colspan="1">微信号</th>
                    <th colspan="2">
                      <div class="vertical-middle-first"></div
                      ><div class="vertical-middle-el line-input-container">
                        <div class="vertical-middle-first"></div
                        ><el-input v-model="details.base.wechat" placeholder="微信号">
                          <template slot="append">
                            <div class="input-line"></div>
                          </template>
                        </el-input>
                      </div>
                    </th>
                  </tr>
                </thead>
              </table>
            </el-form>
          </div>
        </div>
        <div class="margin-normal">
          <el-button v-if="isAdd" type="primary" plain @click="submitInfo(1)">提交</el-button>
          <el-button v-else type="primary" plain @click="submitInfo(2)">保存</el-button>
        </div>
      </el-card>
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>护照信息</span>
          <el-button style="float: right; padding: 3px 0" type="text"></el-button>
        </div>
        <div class="el-table el-table--fit el-table--border el-table--group el-table--enable-row-hover el-table--enable-row-transition">
          <div class="el-table__header-wrapper">
            <el-form :model="details.passport" :rules="rules.passport" ref="passportForm" :showMessage="false">
              <table cellspacing="0" cellpadding="0" border="" class="el-table__header" style="width: 100%;">
                <thead>
                <tr >
                  <th colspan="2">护照拼音</th>
                  <th colspan="2">
                    <div class="vertical-middle-first"></div
                    ><div class="vertical-middle-el line-input-container">
                      <div class="vertical-middle-first"></div
                        ><el-form-item prop="sur_name">
                        <el-input v-model="details.passport.sur_name" placeholder="姓" v-on:blur="fieldValidate('passportForm','sur_name')">
                          <template slot="append">
                            <div class="input-line"></div>
                            <div class="input-error" v-show="errors.sur_name">
                              <el-tooltip class="item" effect="dark" :content="errors.sur_name" placement="top">
                                <i class="el-icon-error"></i>
                              </el-tooltip>
                            </div>
                          </template>
                        </el-input>
                      </el-form-item>
                    </div>
                  </th>
                  <th colspan="2">
                    <div class="vertical-middle-first"></div
                    ><div class="vertical-middle-el line-input-container">
                      <div class="vertical-middle-first"></div
                      ><el-form-item prop="given_names">
                        <el-input v-model="details.passport.given_names" placeholder="名" v-on:blur="fieldValidate('passportForm','given_names')">
                          <template slot="append">
                            <div class="input-line"></div>
                            <div class="input-error" v-show="errors.given_names">
                              <el-tooltip class="item" effect="dark" :content="errors.given_names" placement="top">
                                <i class="el-icon-error"></i>
                              </el-tooltip>
                            </div>
                          </template>
                        </el-input>
                      </el-form-item>
                    </div>
                  </th>
                  <th colspan="2">护照号</th>
                  <th colspan="3">
                    <div class="vertical-middle-first"></div
                    ><div class="vertical-middle-el line-input-container">
                      <div class="vertical-middle-first"></div
                      ><el-form-item prop="passport_no">
                        <el-input v-model="details.passport.passport_no" placeholder="护照号" v-on:blur="fieldValidate('passportForm','passport_no')">
                          <template slot="append">
                            <div class="input-line"></div>
                            <div class="input-error" v-show="errors.passport_no">
                              <el-tooltip class="item" effect="dark" :content="errors.passport_no" placement="top">
                                <i class="el-icon-error"></i>
                              </el-tooltip>
                            </div>
                          </template>
                        </el-input>
                      </el-form-item>
                    </div>
                  </th>
                </tr>
                <tr>
                  <th colspan="2">护照签发地</th>
                  <th colspan="4">
                    <div class="vertical-middle-first"></div
                    ><div class="vertical-middle-el line-input-container">
                      <div class="vertical-middle-first"></div
                      ><el-form-item prop="passport_issue_area">
                        <el-input v-model="details.passport.passport_issue_area" placeholder="护照签发地" v-on:blur="fieldValidate('passportForm','passport_issue_area')">
                          <template slot="append">
                            <div class="input-line"></div>
                            <div class="input-error" v-show="errors.passport_issue_area">
                              <el-tooltip class="item" effect="dark" :content="errors.passport_issue_area" placement="top">
                                <i class="el-icon-error"></i>
                              </el-tooltip>
                            </div>
                          </template>
                        </el-input>
                      </el-form-item>
                    </div>
                  </th>
                  <th colspan="2">护照上的出生地</th>
                  <th colspan="3">
                    <div class="vertical-middle-first"></div
                    ><div class="vertical-middle-el line-input-container">
                      <div class="vertical-middle-first"></div
                      ><el-form-item prop="passport_birth_area">
                        <el-input v-model="details.passport.passport_birth_area" placeholder="护照上的出生地" v-on:blur="fieldValidate('passportForm','passport_birth_area')">
                          <template slot="append">
                            <div class="input-line"></div>
                            <div class="input-error" v-show="errors.passport_birth_area">
                              <el-tooltip class="item" effect="dark" :content="errors.passport_birth_area" placement="top">
                                <i class="el-icon-error"></i>
                              </el-tooltip>
                            </div>
                          </template>
                        </el-input>
                      </el-form-item>
                    </div>
                  </th>
                </tr>
                <tr>
                  <th colspan="2">护照签发日期</th>
                  <th colspan="4">
                    <el-date-picker
                      v-model="details.passport.passport_issue_date"
                      type="date"
                      placeholder="选择日期"
                      format="yyyy 年 MM 月 dd 日"
                      value-format="yyyy-MM-dd">
                    </el-date-picker>
                  </th>
                  <th colspan="2">护照到期日</th>
                  <th colspan="3">
                    <el-date-picker
                      v-model="details.passport.passport_expiration_date"
                      type="date"
                      placeholder="选择日期"
                      format="yyyy 年 MM 月 dd 日"
                      value-format="yyyy-MM-dd">
                    </el-date-picker>
                  </th>
                </tr>
                <tr>
                  <th colspan="2">护照首页（扫描件）</th>
                  <th colspan="9">
                    <el-upload
                      action="https://jsonplaceholder.typicode.com/posts/"
                      :auto-upload="false"
                      list-type="picture-card"
                      :file-list="fileList2"
                      :on-preview="handlePictureCardPreview"
                      :on-remove="handleRemove">
                      <i class="el-icon-plus"></i>
                    </el-upload>
                  </th>
                </tr>
                </thead>
              </table>
            </el-form>
          </div>
        </div>
        <div class="margin-normal">
          <el-button type="primary" plain @click="submitPassport()">保存</el-button>
        </div>
      </el-card>
    </div>
    <el-dialog :visible.sync="dialogVisible" size="tiny">
      <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>
  </div>
</template>
<script>
  import { mapActions } from 'vuex';
  export default {
    name: 'app-exhibitor-detail',
    components: {},
    beforeRouteEnter (to, from, next) {
      next(vm => {
        // 通过 `vm` 访问组件实例
        const regex = /^\d+$/i;
        if (!regex.test(vm.$route.params.id) && vm.$route.params.id !== 'add') {
          vm.$router.push({ path: '/exhibitors' });
        }
      });
    },
    props: {
      needBreadcrumb: {
        type: Boolean,
        default: true
      }
    },
    data () {
      return {
        oldName: '',
        idGenerator: 1000,
        details: {
          base: {
            exhibitor_info_id: 0, // 人员id
            enterprise_info_name: '', // 所属企业公司名称
            name: '', // 姓名（中文）
            id_card: null, // 身份证号
            birth_date: null, //  出生日期
            sex: null, //  性别 1男 2女 0 未知
            duty: null, //  职务
            telphone: null, //  手机
            email: null, //  邮箱
            mobile: null, //  联系电话
            fex: null, //  传真
            qq: null, //  qq号码
            wechat: null //  微信号
          },
          passport: {
            sur_name: null, //  护照姓拼音surname
            given_names: null, //  护照名拼音givennames
            passport_no: null, //  护照号
            passport_issue_area: '', // 护照签发地
            passport_birth_area: '', // 护照出生地
            passport_issue_date: null, //  护照签发日
            passport_expiration_date: null, //  护照到期日
            passport_home_page_url: null //  护照首页扫描件
          }
        },
        rules: {
          base: {
            name: [
              { required: true, message: '请输入姓名', trigger: 'blur' }
            ],
            email: [
              {type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur'}
            ],
            telphone: [
              {pattern: /^1[3|4|5|8][0-9]\d{8}$/, message: '请输入正确的手机号码', trigger: 'blur'}
            ],
            id_card: [
              {pattern: /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/, message: '身份证格式错误', trigger: 'blur'}
            ],
            fex: [
              {pattern: /^(\d{3,4}-)?\d{7,8}$/, message: '格式错误', trigger: 'blur'}
            ],
            qq: [
              {pattern: /^[1-9][0-9]{4,9}$/, message: 'qq格式错误', trigger: 'blur'}
            ]
          },
          passport: {
            sur_name: [
              { required: true, message: '请输入护照上的姓拼音', trigger: 'blur' }
            ],
            given_names: [
              { required: true, message: '请输入护照上的名拼音', trigger: 'blur' }
            ],
            passport_no: [
              { required: true, message: '请输入护照号', trigger: 'blur' }
            ],
            passport_issue_area: [
              { required: true, message: '请输入护照签发地', trigger: 'blur' }
            ],
            passport_birth_area: [
              { required: true, message: '请输入护照上的出生地', trigger: 'blur' }
            ]
          }
        },
        errors: {
          name: '',
          email: '',
          telphone: '',
          id_card: '',
          fex: '',
          qq: '',
          sur_name: '',
          passport_no: '',
          given_names: '',
          passport_issue_area: '',
          passport_birth_area: ''
        },
        fileList2: [
          {
            name: 'food.jpeg',
            url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
          },
          {
            name: 'food2.jpeg',
            url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
          }
        ],
        dialogImageUrl: '',
        dialogVisible: false
      };
    },
    computed: {
      isAdd () {
        return this.$route.params.id === 'add';
      },
      exhibitorInfo () {
        return this.$store.getters.getExhibitor(this.$route.params.id);
      },
      currentExhibitor () {
        return this.$store.state.exhibitors.exhibitor;
      }
    },
    mounted () {
      if (!this.isAdd) {
        if (this.exhibitorInfo) {
          this.initInfo(this.exhibitorInfo);
        } else {
          this.$router.push({path: 'exhibitors'});
        }
      } else {
        const exhibitor = Object.assign(this.deepCopy(this.details.base), this.deepCopy(this.details.passport));
        this.initInfo(exhibitor);
      }
    },
    methods: {
      ...mapActions(['initCurrentExhibitor', 'updateCurrentExhibitor', 'addExhibitor']),
      handleRemove (file, fileList) {
        console.log(file, fileList);
      },
      handlePictureCardPreview (file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },
      fieldValidate (formRefName, propName) {
        const _this = this;
        this.$refs[formRefName].validateField(propName, function (message) {
          console.log(message);
          _this.errors[propName] = message;
        });
      },
      initInfo (exhibitor) {
        this.initCurrentExhibitor(exhibitor);
        const {
          exhibitor_info_id,
          enterprise_info_name,
          name,
          id_card,
          birth_date,
          sex,
          duty,
          telphone,
          email,
          mobile,
          fex,
          qq,
          wechat,
          sur_name,
          given_names,
          passport_no,
          passport_birth_area,
          passport_issue_area,
          passport_issue_date,
          passport_expiration_date,
          passport_home_page_url
        } = exhibitor;
        this.oldName = name;
        this.details.base = {
          exhibitor_info_id,
          enterprise_info_name,
          name,
          id_card,
          birth_date: birth_date ? new Date(birth_date * 1000) : '',
          sex,
          duty,
          telphone,
          email,
          mobile,
          fex,
          qq,
          wechat
        };
        this.details.passport = {
          sur_name,
          given_names,
          passport_no,
          passport_issue_area,
          passport_birth_area,
          passport_issue_date: passport_issue_date ? new Date(passport_issue_date * 1000) : '',
          passport_expiration_date: passport_expiration_date ? new Date(passport_expiration_date * 1000) : '',
          passport_home_page_url
        };
      },
      submitInfo (type) {
        const {
          enterprise_info_name,
          name,
          id_card,
          birth_date,
          sex,
          duty,
          telphone,
          email,
          mobile,
          fex,
          qq,
          wechat
        } = this.details.base;
        let params = {
          enterprise_info_name,
          name,
          id_card,
          birth_date: Date.parse(birth_date) / 1000,
          sex,
          duty,
          telphone,
          email,
          mobile,
          fex,
          qq,
          wechat
        };
        this.$refs['baseForm'].validate((valid) => {
          if (!valid) {
            // 触发所有校验
            for (let key in this.details.base) {
              if (key in this.rules.base) {
                this.fieldValidate('baseForm', key);
              }
            }
            return;
          }
          if (type === 1 && !this.currentExhibitor.exhibitor_info_id) {
            this.$message({
              message: '新增成功！',
              type: 'success'
            });
            params['exhibitor_info_id'] = this.idGenerator++;
            this.addExhibitor(this.currentExhibitor);
            this.updateCurrentExhibitor(params);
          } else {
            params['exhibitor_info_id'] = this.currentExhibitor.exhibitor_info_id;
            this.$message({
              message: '修改成功！',
              type: 'success'
            });
            this.updateCurrentExhibitor(params);
          }
        });
      },
      submitPassport () {
        const {
          sur_name,
          given_names,
          passport_no,
          passport_birth_area,
          passport_issue_area,
          passport_issue_date,
          passport_expiration_date,
          passport_home_page_url
        } = this.details.passport;
        let params = {
          name: this.currentExhibitor.name,
          sur_name,
          given_names,
          passport_no,
          passport_birth_area,
          passport_issue_area,
          passport_issue_date: Date.parse(passport_issue_date) / 1000,
          passport_expiration_date: Date.parse(passport_expiration_date) / 1000,
          passport_home_page_url
        };
        if (!this.currentExhibitor.exhibitor_info_id) {
          this.$notify({
            title: '提示',
            message: '请先提交基本信息！',
            type: 'warning'
          });
          return;
        }
        this.$refs['passportForm'].validate((valid) => {
          if (!valid) {
            // 触发所有校验
            for (let key in this.details.passport) {
              if (key in this.rules.passport) {
                this.fieldValidate('passportForm', key);
              }
            }
            return;
          }
          params['exhibitor_info_id'] = this.currentExhibitor.exhibitor_info_id;
          this.$message({
            message: '修改成功！',
            type: 'success'
          });
          this.updateCurrentExhibitor(params);
        });
      }
    }
  };
</script>
<style lang="scss" scoped>
  @import '../../style/element/table-form.scss';
  .margin-normal {
    margin: 15px 0;
  }
  .box-card {
    margin-bottom: 20px;
  }
  /deep/ .el-upload {
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>
