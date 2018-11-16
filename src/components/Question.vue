<template>
	<div class="alert">
		<h3>{{ x }} + {{ y }} = {{result}}</h3>
		<hr>
		<div class="buttons">
			<button class="btn btn-success" v-for="number in answers" @click="onAnswer(number)">
				{{ number }}
			</button>
		</div>
	</div>
</template>

<script>
    export default {
        name: "Question",
		props: ['settings'],
        data() {
            return {
                result: '?',
                x: mtRandom(this.settings.min, this.settings.max),
                y: mtRandom(this.settings.min, this.settings.max)
            }
        },
        computed: {
            good() {
              return this.x + this.y
			},
            answers() {
                let good = this.good;
                let res = [this.good];

                while (res.length < this.settings.variants) {
                    var num = mtRandom(this.good - this.settings.range, this.good + this.settings.range);
                    if (res.indexOf(num) === -1) {
                        res.push(num)
                    }
                }

                return res.sort();
            }
        },
        methods: {
            onAnswer(num) {
                if(num == this.good) {
                    this.$emit('success');
				} else {
                    this.$emit('error', `${this.x} + ${this.y} = ${this.good}!`);
				}
			}
		}
    }

    function mtRandom(min, max) {
        let diff = max - min;
        return Math.floor(Math.random() * (diff + 1)) + min;
    }
</script>

<style scoped>
	.btn {
		margin: 0 10px;
	}
</style>
