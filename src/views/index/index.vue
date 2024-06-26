<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h2>Essential Links</h2>
	<figure class="imghvr-shutter-out-diag-1">
	  <img src="@/assets/images/begood.png">
	  <figcaption>
	    // Hover Content
	  </figcaption>
	  <a href="http://www.imagehover.io"></a>
	</figure>
		
	<div class="">
		<SkitterSlider></SkitterSlider>
	</div>
  </div>
</template>

<script>
	import SkitterSlider from '@/components/SkitterSlider'
export default {
  name: 'HelloWorld',
  components: {
  	SkitterSlider
  },
  data () {
    return {
		msg: 'Welcome to Your Vue.js App',
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
