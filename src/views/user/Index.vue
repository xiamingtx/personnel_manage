<template>
  <div class="page">
    <section class="page-header">
      <section class="page-header-list">
        <section class="page-header-title">用户列表</section>
        <section class="page-header-icon">
          <q-icon name="view_list"></q-icon>
        </section>
      </section>
      <section class="q-pa-md q-gutter-sm page-header-btn">
        <q-btn color="primary" label="添加用户" @click="onAdd" />
      </section>
    </section>
    <div class="q-pa-md">
      <q-table
        title="Treats"
        :rows="rows"
        :columns="columns"
        :filter="filter"
        color="primary"
        row-key="name"
      >
        <!-- 搜索 -->
        <template v-slot:top-left>
          <q-input
            outlined
            dense
            debounce="300"
            v-model="filter"
            placeholder="查询"
          >
            <template v-slot:append>
              <q-icon name="search" />
            </template>
          </q-input>
        </template>

        <!-- 导出文件 -->
        <template v-slot:top-right>
          <q-btn
            color="primary"
            icon-right="archive"
            label="导出表格"
            no-caps
            @click="exportTable"
          />
        </template>

        <template v-slot:body-cell-operation="props">
          <q-td :props="props">
            <q-btn-group>
              <q-btn
                color="primary"
                icon="build"
                label="修改"
                @click="onUpdate(props.row)"
              />
              <q-btn
                color="deep-orange"
                icon="delete"
                label="删除"
                @click="onDelete(props.row.id)"
              />
            </q-btn-group>
          </q-td>
        </template>
      </q-table>
    </div>
    <Confirm
      ref="confirm"
      title="请问您确认要删除吗?"
      @on-confirm="deleteUser"
    />

    <CreateDialog ref="createDialog" @create-success="fetchData" />

    <UpdateDialog ref="updateDialog" @update-success="fetchData" />
  </div>
</template>

<script setup lang="ts">
// @ts-nocheck
import { ref, onMounted, reactive } from "vue";
import { exportFile, useQuasar } from "quasar";
import { list, removeUser } from "../../api/user";
import notify from "../../utils/notify";
import Confirm from "../../components/dialog/Confirm.vue";
import CreateDialog from "./CreateDialog.vue";
import UpdateDialog from "./UpdateDialog.vue";
import { UserUpdateRequest } from "../../types/user";

const columns = [
  {
    name: "nickname",
    required: true,
    label: "昵称",
    align: "left",
    field: (row: any) => row.nickname,
    format: (val: any) => `${val}`,
    sortable: true,
  },
  {
    name: "mobile",
    align: "center",
    label: "联系方式",
    field: "mobile",
    sortable: true,
  },
  {
    name: "roles",
    label: "权限",
    align: "center",
    field: "roles",
    sortable: true,
  },
  {
    name: "gender",
    label: "性别",
    align: "center",
    field: "gender",
    sortable: true,
  },
  {
    name: "username",
    label: "用户名",
    align: "center",
    field: "username",
    sortable: true,
  },
  {
    name: "operation",
    field: "operation",
    align: "center",
    label: "操作",
  },
];

declare interface role {
  name: string;
  title: string;
}

declare interface User {
  id: string;
  username: string;
  nickname: string;
  gender: "男" | "女" | "未知" | "MALE" | "FEMALE" | "UNKNOWN";
  mail: string;
  mobile: string;
  roles: role[];
}

// 为什么这里quasar不会解reactive 只会解ref
// let rows:user[] = reactive([])
const rows: User[] = ref([]);

const $q = useQuasar();

const filter = ref("");

const confirm = ref(null);

const selectedId = ref("");

const createDialog = ref(null);

const updateDialog = ref(null);

const userUpdateRequest: UserUpdateRequest = reactive({
  nickname: "",
  gender: "MALE",
});

const fetchData = () => {
  list().then((res) => {
    res.data.forEach((item) => {
      // 修改role的展现形式
      let role = "[";
      item.roles.forEach((item_role, index) => {
        role += item_role.title + (index == item.roles.length - 1 ? "" : ", ");
      });
      role += "]";
      item.roles = role;
      // 修改gender的展现形式
      if (item.gender === "MALE") {
        item.gender = "男";
      } else if (item.gender === "FEMALE") {
        item.gender = "女";
      } else {
        item.gender = "未知";
      }
    });

    rows.value = res.data;
  });
};

const onAdd = () => {
  createDialog.value.showCreateDialog();
};

const onUpdate = (user: User) => {
  userUpdateRequest.nickname = user.nickname;
  if (user.gender === "男") {
    userUpdateRequest.gender = "MALE";
  } else if (user.gender === "女") {
    userUpdateRequest.gender = "FEMALE";
  } else {
    userUpdateRequest.gender = "UNKNOWN";
  }
  updateDialog.value.updateModel(user.id, userUpdateRequest);
  updateDialog.value.showUpdateDialog();
};

const deleteUser = () => {
  removeUser(selectedId.value).then(() => {
    notify.success("删除成功!");
    fetchData();
  });
};

const onDelete = (id) => {
  selectedId.value = id;
  toggleConfirm();
};

const toggleConfirm = () => {
  // 获取子组件的方法
  confirm.value.toggleConfirm();
};

onMounted(fetchData);

// 文件下载
const wrapCsvValue = (val: string, formatFn?: Function, row?: object) => {
  console.log(val);
  console.log(formatFn);
  console.log(row);
  let formatted = formatFn !== void 0 ? formatFn(val, row) : val;

  formatted =
    formatted === void 0 || formatted === null ? "" : String(formatted);

  formatted = formatted.split('"').join('""');
  /**
   * Excel accepts \n and \r in strings, but some other CSV parsers do not
   * Uncomment the next two lines to escape new lines
   */
  // .split('\n').join('\\n')
  // .split('\r').join('\\r')

  return `"${formatted}"`;
};

const exportTable = () => {
  // naive encoding to csv format
  const content = [columns.map((col) => wrapCsvValue(col.label))]
    .concat(
      rows.map((row: any) =>
        columns
          .map((col) =>
            wrapCsvValue(
              typeof col.field === "function"
                ? col.field(row)
                : row[col.field === void 0 ? col.name : col.field],
              col.format,
              row
            )
          )
          .join(",")
      )
    )
    .join("\r\n");

  const status = exportFile("人员信息表.csv", content, "text/csv");

  if (status !== true) {
    $q.notify({
      message: "Browser denied file download...",
      color: "negative",
      icon: "warning",
    });
  }
};
</script>

<style lang="scss" scoped>
.page {
  .page-header {
    margin: 20px 0 0 20px;
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: space-between;
    .page-header-list {
      display: flex;
      .page-header-title {
        font-size: 25px;
      }
      .page-header-icon {
        padding-left: 10px;
        font-size: 25px;
      }
    }
    .page-header-btn {
      margin-right: 50px;
    }
  }
}
</style>
