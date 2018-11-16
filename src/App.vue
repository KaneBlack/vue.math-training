<template>
	<div id="app" class="text-center mt-3">
		<div class="container">
			<div class="row">
				<div class="col-12">
					<h2>Main training. Level {{level + 1}}</h2>
					<span>Success: {{ stats.success }}</span>
					<br>
					<span>Error: {{ stats.error }}</span>
					<hr>
					<div class="progress">
						<div class="progress-bar" :style="progressStyles"></div>
					</div>
					<div class="box">
						<transition name="fade" mode="out-in">
							<app-start-screen
									v-if="state == 'start'"
									@onStart="onStart"></app-start-screen>

							<app-question
									v-else-if="state == 'question'"
									@success="onQuestSuccess"
									@error="onQuestError"
									:settings="levels[level]"></app-question>

							<app-message
									v-else-if="state == 'message'"
									:type="message.type"
									:text="message.text"
									@onNext="onNext"></app-message>

							<app-result-screen
									v-else-if="state == 'result'"
									:stats="stats"
									@repeat="onStart"
									@nextLevel="onNextLevel"></app-result-screen>

							<div v-else>Unknown state</div>
						</transition>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
    export default {
        name: 'App',
        data() {
            return {
                state: 'start',
                stats: {
                    success: 0,
                    error: 0
                },
                message: {
                    type: '',
                    text: '',
                },
                questMax: 5,
				level: 0,
				levels: [
                    {
                        variants: 2,
                        min: 10,
                        max: 40,
						range: 5
                    },
					{
					    variants: 4,
					    min: 100,
						max: 300,
						range: 20,
					},
                    {
                        variants: 6,
                        min: 500,
                        max: 900,
                        range: 40,
                    },
                    {
                        variants: 6,
                        min: 800,
                        max: 1200,
                        range: 50,
                    }
				]
            }
        },
        computed: {
            questDone() {
                return this.stats.success + this.stats.error;
            },
            progressStyles() {
                return {
                    width: (this.questDone / this.questMax * 100) + '%'
                }
            }
        },
        methods: {
            onStart() {
                this.state = 'question';
                this.stats.success = 0;
                this.stats.error = 0;
            },
            onQuestSuccess() {
                this.state = 'message';
                this.message.text = 'Good Job yo!';
                this.message.type = 'success';
                this.stats.success++
            },
            onQuestError(msg) {
                this.state = 'message';
                this.message.text = msg;
                this.message.type = 'warning';
                this.stats.error++
            },
            onNext() {
                if (this.questDone == this.questMax) {
                    this.state = 'result';
                } else {
                    this.state = 'question';
                }
            },
            onNextLevel() {
                console.log(this.levels.length);
                console.log(this.level);

                if(this.level == (this.levels.length - 1)) {
                    this.level = 0;
                    this.onStart();
                } else {
                    this.level++;
                    this.onStart();
                }
			}
        }
    }
</script>

<style lang="scss">
	@import '../node_modules/bootstrap/scss/bootstrap.scss';

	.fade-enter-active, .fade-leave-active {
		transition: opacity .2s;
	}

	.fade-enter, .fade-leave-to {
		opacity: 0;
	}

	.progress-bar {
		transition: width 300ms ease-out;
	}
</style>
