<template> 
    <div class="modaleBloc" v-if="revele">
        <div class="modaleBloc__overlay" v-on:click="toggleModale"></div>

        <div class="modaleBloc__card">
            <div class="modaleBloc__card__title">
                <h2>Créer une publication</h2>
                <div class="modaleBloc__card__title__close">
                    <i class="far fa-times-circle fa-2x modaleBloc__card__title__close" v-on:click="toggleModale"></i>
                </div>
            </div>
            <div class="modaleBloc__card__content">
                <span>Que souhaitez vous partager ?</span>
                <div class="modaleBloc__card__content__user">

                </div>
                <div class="modaleBloc__card__content__options">

                </div>
            </div>
            <button class="modaleBloc__card__button">Publier</button>
        </div>

    </div>
</template>

<script>
export default {
    name: 'Modale',
    props: ['revele', 'toggleModale']
}
</script>

<style scoped lang="scss">
    .modaleBloc {
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        &__overlay {
            background: rgba(0,0,0,0.5);
            position: fixed;
            top: 0;
            bottom: 0;
            left: 0;
            right: 0;
        }
        &__card {
            z-index: 2;
            position: fixed;
            background: #f1f1f1;
            color: #3f3d56;
            &__title {
                display: flex;
                text-align: center;
                padding: 3rem 6rem;
                & h2 {
                    margin-top: 0px;
                }
                &__close {
                    position: absolute;
                    top: 1rem;
                    right: 1rem;
                    color: #3f3d56;
                    &:hover {
                        color: #ff6363;
                    }
                }
            }
            &__content {
                border: 3px #E4E6EB solid;
                border-radius: 20px;
                margin: 0 1rem 1rem 1rem;
                padding: 1.5rem 0.5rem 4rem 0.5rem;
            }
            &__button {
                border: 3px solid #3f3d56;
                border-radius: 25px;
                color: #3f3d56;
                font-size: 15px;
                font-weight: bold;
                padding: 0.5rem;
                margin: 1rem;
                &:hover {
                    border: 3px solid #ff6363;
                    color: #ff6363;
                }
            }
        }       
    }
</style>