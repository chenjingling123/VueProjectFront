<template>
	<div class="app-container">
		<el-card shadow="always">
			<el-form :model="queryParams" :inline="true" label-width="80px">
				<el-form-item label="项目名称">
					<el-input
						v-model="queryParams.prjName"
						placeholder="请输入项目名称"
						clearable
						style="width: 220px"
						@keyup.enter="handleQuery"
					/>
				</el-form-item>
				<el-form-item label="项目编号">
					<el-input
						v-model="queryParams.prjCode"
						placeholder="请输入项目编号"
						clearable
						style="width: 220px"
						@keyup.enter="handleQuery"
					/>
				</el-form-item>
				<el-form-item label="项目经理">
					<el-input
						v-model="queryParams.manager"
						placeholder="请输入项目经理"
						clearable
						style="width: 220px"
						@keyup.enter="handleQuery"
					/>
				</el-form-item>
				<el-form-item label="项目状态">
					<el-input
						v-model="queryParams.prjStatus"
						placeholder="请输入项目状态"
						clearable
						style="width: 220px"
						@keyup.enter="handleQuery"
					/>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" size="mini" @click="handleQuery">搜索</el-button>
					<el-button size="mini" @click="resetQuery">重置</el-button>
				</el-form-item>
			</el-form>

			<el-row :gutter="10" class="mb15">
				<el-col :span="1.5">
					<el-button type="primary" plain size="mini" @click="openAddDialog">新增</el-button>
				</el-col>
				<el-col :span="1.5">
					<el-button type="success" plain size="mini" :disabled="single" @click="handleBatchEdit">修改</el-button>
				</el-col>
				<el-col :span="1.5">
					<el-button type="danger" plain size="mini" :disabled="multiple" @click="handleDelete()">删除</el-button>
				</el-col>
				<el-col :span="1.5">
					<el-button type="warning" plain size="mini" @click="handleExport">导出</el-button>
				</el-col>
			</el-row>

			<el-table v-loading="loading" :data="tableData" @selection-change="handleSelectionChange">
				<el-table-column type="selection" width="55" align="center" />
				<el-table-column label="ID" prop="id" width="80" align="center" />
				<el-table-column label="项目名称" prop="prjName" min-width="180" />
				<el-table-column label="项目编号" prop="prjCode" min-width="140" />
				<el-table-column label="项目状态" prop="prjStatus" min-width="120" />
				<el-table-column label="项目经理" prop="manager" min-width="120" />
				<el-table-column label="金额" prop="money" min-width="120" />
				<el-table-column label="开始日期" prop="startDate" min-width="160" />
				<el-table-column label="结束日期" prop="endDate" min-width="160" />
				<el-table-column label="备注" prop="remark" min-width="180" show-overflow-tooltip />
				<el-table-column label="操作" width="160" align="center">
					<template #default="scope">
						<el-button type="text" size="mini" @click="openEditDialog(scope.row)">修改</el-button>
						<el-button type="text" size="mini" @click="handleDelete(scope.row)">删除</el-button>
					</template>
				</el-table-column>
			</el-table>

			<div v-show="total > 0">
				<el-divider></el-divider>
				<el-pagination
					background
					:total="total"
					:current-page="queryParams.pageNum"
					:page-size="queryParams.pageSize"
					layout="total, sizes, prev, pager, next, jumper"
					@size-change="handleSizeChange"
					@current-change="handleCurrentChange"
				/>
			</div>
		</el-card>

		<el-dialog v-model="dialogVisible" :title="dialogTitle" width="720px">
			<el-form ref="formRef" :model="form" :rules="rules" label-width="90px">
				<el-row :gutter="20">
					<el-col :span="12">
						<el-form-item label="项目名称" prop="prjName">
							<el-input v-model="form.prjName" placeholder="请输入项目名称" />
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="项目编号" prop="prjCode">
							<el-input v-model="form.prjCode" placeholder="请输入项目编号" />
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="项目状态" prop="prjStatus">
							<el-input v-model="form.prjStatus" placeholder="请输入项目状态" />
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="项目经理" prop="manager">
							<el-input v-model="form.manager" placeholder="请输入项目经理" />
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="项目类型" prop="prjType">
							<el-input v-model.number="form.prjType" placeholder="请输入项目类型" />
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="金额" prop="money">
							<el-input v-model.number="form.money" placeholder="请输入金额" />
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="开始日期" prop="startDate">
							<el-date-picker
								v-model="form.startDate"
								type="datetime"
								placeholder="请选择开始日期"
								style="width: 100%"
								value-format="YYYY-MM-DD HH:mm:ss"
							/>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="结束日期" prop="endDate">
							<el-date-picker
								v-model="form.endDate"
								type="datetime"
								placeholder="请选择结束日期"
								style="width: 100%"
								value-format="YYYY-MM-DD HH:mm:ss"
							/>
						</el-form-item>
					</el-col>
					<el-col :span="24">
						<el-form-item label="项目描述" prop="prjDesc">
							<el-input v-model="form.prjDesc" type="textarea" :rows="3" placeholder="请输入项目描述" />
						</el-form-item>
					</el-col>
					<el-col :span="24">
						<el-form-item label="备注" prop="remark">
							<el-input v-model="form.remark" type="textarea" :rows="2" placeholder="请输入备注" />
						</el-form-item>
					</el-col>
				</el-row>
			</el-form>
			<template #footer>
				<el-button size="small" @click="dialogVisible = false">取消</el-button>
				<el-button type="primary" size="small" @click="submitForm">确定</el-button>
			</template>
		</el-dialog>
	</div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, ref } from 'vue';
import { ElMessage, ElMessageBox } from 'element-plus';
import { addProjectInfo, deleteProjectInfo, listProjectInfo, updateProjectInfo } from '/@/api/research/project';

const createEmptyForm = () => ({
	id: undefined as number | undefined,
	prjName: '',
	prjCode: '',
	prjType: undefined as number | undefined,
	prjStatus: '',
	prjDesc: '',
	startDate: '',
	endDate: '',
	manager: '',
	money: undefined as number | undefined,
	remark: '',
});

export default defineComponent({
	name: 'researchProjectIndex',
	setup() {
		const loading = ref(false);
		const total = ref(0);
		const tableData = ref<any[]>([]);
		const ids = ref<number[]>([]);
		const single = ref(true);
		const multiple = ref(true);
		const dialogVisible = ref(false);
		const dialogTitle = ref('新增项目');
		const formRef = ref();

		const queryParams = reactive({
			pageNum: 1,
			pageSize: 10,
			prjName: '',
			prjCode: '',
			manager: '',
			prjStatus: '',
		});

		const form = reactive(createEmptyForm());

		const rules = {
			prjName: [{ required: true, message: '请输入项目名称', trigger: 'blur' }],
			prjCode: [{ required: true, message: '请输入项目编号', trigger: 'blur' }],
		};

		const loadData = () => {
			loading.value = true;
			listProjectInfo(queryParams)
				.then((response: any) => {
					tableData.value = response.data.data || [];
					total.value = response.data.total || 0;
				})
				.finally(() => {
					loading.value = false;
				});
		};

		const handleQuery = () => {
			queryParams.pageNum = 1;
			loadData();
		};

		const resetQuery = () => {
			queryParams.prjName = '';
			queryParams.prjCode = '';
			queryParams.manager = '';
			queryParams.prjStatus = '';
			queryParams.pageNum = 1;
			loadData();
		};

		const handleCurrentChange = (pageNum: number) => {
			queryParams.pageNum = pageNum;
			loadData();
		};

		const handleSizeChange = (pageSize: number) => {
			queryParams.pageSize = pageSize;
			queryParams.pageNum = 1;
			loadData();
		};

		const handleSelectionChange = (selection: any[]) => {
			ids.value = selection.map((item) => item.id);
			single.value = selection.length !== 1;
			multiple.value = selection.length === 0;
		};

		const resetForm = () => {
			Object.assign(form, createEmptyForm());
		};

		const openAddDialog = () => {
			resetForm();
			dialogTitle.value = '新增项目';
			dialogVisible.value = true;
		};

		const openEditDialog = (row: any) => {
			resetForm();
			Object.assign(form, { ...row });
			dialogTitle.value = '修改项目';
			dialogVisible.value = true;
		};

		const handleBatchEdit = () => {
			if (ids.value.length !== 1) {
				ElMessage.warning('请选择一条需要修改的数据');
				return;
			}
			const row = tableData.value.find((item) => item.id === ids.value[0]);
			if (!row) {
				ElMessage.warning('未找到选中的项目数据');
				return;
			}
			openEditDialog(row);
		};

		const buildSubmitData = () => {
			const data: Record<string, any> = { ...form };
			Object.keys(data).forEach((key) => {
				if (data[key] === '' || data[key] === undefined || data[key] === null) {
					delete data[key];
				}
			});
			return data;
		};

		const submitForm = () => {
			if (!form.prjName) {
				ElMessage.warning('请输入项目名称');
				return;
			}
			if (!form.prjCode) {
				ElMessage.warning('请输入项目编号');
				return;
			}
			const submitData = buildSubmitData();
			const request = submitData.id ? updateProjectInfo(submitData) : addProjectInfo(submitData);
			request.then(() => {
				ElMessage.success(submitData.id ? '修改成功' : '新增成功');
				dialogVisible.value = false;
				loadData();
			});
		};

		const handleExport = () => {
			const rows = tableData.value || [];
			if (!rows.length) {
				ElMessage.warning('暂无可导出的数据');
				return;
			}
			const headers = ['ID', '项目名称', '项目编号', '项目状态', '项目经理', '金额', '开始日期', '结束日期', '备注'];
			const keys = ['id', 'prjName', 'prjCode', 'prjStatus', 'manager', 'money', 'startDate', 'endDate', 'remark'];
			const csv = [
				headers.join(','),
				...rows.map((row) =>
					keys
						.map((key) => {
							const value = row[key] ?? '';
							return `"${String(value).replace(/"/g, '""')}"`;
						})
						.join(',')
				),
			].join('\n');
			const blob = new Blob(['\ufeff' + csv], { type: 'text/csv;charset=utf-8;' });
			const link = document.createElement('a');
			const url = URL.createObjectURL(blob);
			link.href = url;
			link.download = `project_info_${Date.now()}.csv`;
			document.body.appendChild(link);
			link.click();
			document.body.removeChild(link);
			URL.revokeObjectURL(url);
			ElMessage.success('导出成功');
		};

		const handleDelete = (row?: any) => {
			const deleteIds = row?.id ? [row.id] : ids.value;
			if (!deleteIds.length) return;
			ElMessageBox.confirm('确定删除选中的项目吗？', '提示', { type: 'warning' }).then(() => {
				deleteProjectInfo(deleteIds).then(() => {
					ElMessage.success('删除成功');
					loadData();
				});
			});
		};

		onMounted(() => {
			loadData();
		});

		return {
			loading,
			total,
			tableData,
			queryParams,
			single,
			multiple,
			dialogVisible,
			dialogTitle,
			form,
			formRef,
			rules,
			handleQuery,
			resetQuery,
			handleCurrentChange,
			handleSizeChange,
			handleSelectionChange,
			openAddDialog,
			openEditDialog,
			handleBatchEdit,
			submitForm,
			handleDelete,
			handleExport,
		};
	},
});
</script>
