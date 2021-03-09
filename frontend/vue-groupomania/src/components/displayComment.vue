<template>
    <div class="displayComment" v-for="comment in comments" :key="comment.postId">
        <div class="displayPost__item">
            <div class="displayPost__item__information">
                <div class="displayPost__item__information__user">
                    <img class="displayPost__item__information__user__photo" src="https://cdn.pixabay.com/photo/2017/06/13/12/53/profile-2398782_960_720.png" alt="">
                    <h2 class="displayPost__item__information__user__name"> {{ comment.User.username }}</h2>
                </div>
                <div>
                    <span class="displayPost__item__information__date">Publié le {{ dateFormat(comment.createdAt) }}</span>
                </div>
            </div>
            <div class="displayPost__item__publication">
                <p class="displayPost__item__publication__text">{{ comment.content }}</p>
            </div>
        </div>
    </div>
</template>
