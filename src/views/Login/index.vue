<template>
	<el-card class="login">
		<el-form
			:inline="false"
			:model="formInline"
			class="demo-form-inline"
			label-width="120px"
			:rules="rules"
			ref="form"
		>
			<el-form-item label="user name ：" prop="user">
				<el-input v-model="formInline.user" placeholder="user name" />
			</el-form-item>
			<el-form-item label="pwd：" prop="pwd">
				<el-input v-model="formInline.pwd" type="password" placeholder="pwd">
				</el-input>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="onSubmit">登录</el-button>
			</el-form-item>
		</el-form>
	</el-card>
</template>

<script setup lang="ts">
	import requsest from "@/http/request";
	import { ElMessage, FormInstance } from "element-plus";
	import { reactive, ref } from "vue";
	import { useRouter } from "vue-router";
	const router = useRouter();
	const form = ref<FormInstance>();

	const rules = reactive({
		user: [{ required: true, message: "必填选项" }],
		pwd: [{ required: true, message: "必填选项" }],
	});

	const formInline = reactive({
		user: "",
		pwd: "",
	});

	const onSubmit = () => {
		form.value?.validate((validate) => {
			if (validate) {
				requsest({
					method: "get",
					url: "/login",
					params: { name: "a", pwd: "123456" },
				});
				localStorage.setItem("token", "admin");
				router.push("/home");
			} else {
				ElMessage("输入信息错误");
			}
		});
	};
</script>

<style scoped lang="scss">
	.login {
		display: flex;
		justify-content: center;
		align-items: center;
	}
</style>
