<template>
  <div>
    <div class="container-fluid">
      <h1 class="page-title">参展人员资料库</h1>
      <div class="margin-bottom-normal">
        <router-link to="/exhibitors/add">
          <el-button type="primary" size="medium" icon="el-icon-plus" plain>新增</el-button>
        </router-link>
      </div>
      <div class="row">
        <div class="col-lg-12">
          <el-table
            :data="exhibitorsList"
            border
            style="width: 100%">
            <el-table-column
              prop="name"
              label="姓名">
            </el-table-column>
            <el-table-column
              prop="passport_no"
              label="护照号">
            </el-table-column>
            <el-table-column
              prop="sex"
              label="性别">
            </el-table-column>
            <el-table-column
              prop="telphone"
              label="手机号">
            </el-table-column>
            <el-table-column
              prop="email"
              label="邮箱">
            </el-table-column>
            <el-table-column
              prop="qq"
              label="QQ">
            </el-table-column>
            <el-table-column
              width="180"
              label="操作">
              <template slot-scope="scope">
                <router-link :to="'/exhibitors/'+scope.row.exhibitor_info_id">
                  <el-button type="success" size="mini" plain>修改</el-button>
                </router-link>
                <el-button type="info" size="mini" plain @click="deleteExhibitor(scope.row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapActions } from 'vuex';
  import { C_exhibitor_list } from '../../mock/exhibitors.mock';
  export default {
    name: 'app-exhibitors',
    components: {},
    data () {
      return {
      };
    },
    computed: {
      exhibitorsList () {
        return this.$store.state.exhibitors.lists;
      }
    },
    mounted: function () {
      // 获取参展人员列表
      this.initExhibitors(C_exhibitor_list);
    },
    methods: {
      ...mapActions(['initExhibitors', 'deleteExhibitorAction', 'modifyExhibitorAction']),
      deleteExhibitor (rowInfo) {
        this.$confirm(`确认删除${rowInfo.name}的资料？`, '警告', {
          confirmButtonText: '确定',
          type: 'warning'
        }).then(() => {
          this.deleteExhibitorAction(rowInfo.exhibitor_info_id);
        }).catch(() => {});
      },
      modifyExhibitor () {

      }
    }
  };
</script>
<style lang="less" scoped>
  .margin-bottom-normal {
    margin-bottom: 15px;
  }
</style>
