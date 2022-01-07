<template>
    <div class="container mt-3">
        <div class="row justify-content-center">
            <div class="col-md-12">
                <div class="card card-default">
                    <div class="card-header">BARANG</div>
                    <div class="card-body">
                        <router-link :to="{ name: 'create' }" class="btn btn-md btn-success">TAMBAH BARANG</router-link>
                        <button @click.prevent="logout" class="btn btn-sm btn-danger">LOGOUT</button>

                        <div class="table-responsive mt-2">
                            <table class="table table-hover table-bordered">
                                <thead>
                                <tr>
                                    <th>NAMA</th>
                                    <th>JENIS</th>
                                    <th>AKSI</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr v-for="(post, index) in posts" :key="post.id">
                                    <td>{{ post.title }}</td>
                                    <td>{{ post.content }}</td>
                                    <td class="text-center">
                                        <router-link :to="{name: 'edit', params: { id: post.id }}" class="btn btn-sm btn-primary">EDIT</router-link>
                                        <button @click.prevent="PostDelete(post.id, index)" class="btn btn-sm btn-danger">HAPUS</button>
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                posts: [],
                loggedIn: localStorage.getItem('loggedIn'),
                //state token
                token: localStorage.getItem('token'),
            }
        },
        created() {
            // console.log(this.token)
            if (this.token != null) {
                let uri = `http://localhost:8000/api/posts`;
                this.axios.get(uri).then(response => {
                    this.posts = response.data.data;
                });
            }else {
                return this.$router.push({ name: 'login' }) 
            }
            
        },
        methods: {
            PostDelete(id, index)
            {
                this.axios.delete(`http://localhost:8000/api/posts/${id}`)
                    .then(response => {
                        this.posts.splice(index, 1);
                    }).catch(error => {
                    alert('system error!');
                });
            },
            logout(){    
                let token = localStorage.getItem('token')
                axios.defaults.headers.common.Authorization = `Bearer ${token}`
                axios.post('http://localhost:8000/api/logout')
                    .then(response => {
                    console.log(response.status)
                        if(response.status == 200) {
                            //remove localStorage
                            localStorage.removeItem('token')
                            //redirect ke halaman login
                            this.$router.push({
                                name: 'login'
                            })
                        }
                    }).catch(error => {
                    console.log(error.response.data)
                });
            }
        }
    }
</script>