<template>
    <div>
        <input type="text" v-model="loginForm.username" placeholder="用户名"/>
        <input type="text" v-model="loginForm.password" placeholder="密码"/>
        <button @click="login">登录</button>
    </div>
</template>

<script>
    import { mapMutations } from 'vuex';
    export default {
        name: "Login",
        data(){
            return{
                loginForm: {
                    username: '',
                    password: ''
                },
                userToken: '',
            };
        },
        methods:{
            ...mapMutations(['changeLogin']),
            login() {
                if (this.loginForm.username === '' || this.loginForm.password === '') {
                    alert('账号或密码不能为空');
                } else {
                    let params = new URLSearchParams();
                    params.append('username', this.loginForm.username);
                    params.append('password', this.loginForm.password);
                    this.$axios.post('/login',params)
                        .then(res => {
                            console.log(res.data);
                            this.userToken = res.data.body;
                            // 将用户token保存到vuex中
                            this.changeLogin({ 'access-token': this.userToken });
                            this.$router.push('/home');
                            alert('登陆成功');
                        })
                        .catch(error => {
                            alert('账号或密码错误');
                            console.log(error);
                        });
                }
        }
    }
}
</script>

<style scoped>

</style>
