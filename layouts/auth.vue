<template>
    <div class="layout-auth">
        <div :class="$style.auth">
                <div :class="$style.logo">
                    <div :class="$style.logoContent">
                        <img src="~/static/img/mainLogoTransperent.png" alt="Main Logo">
                    </div>
                </div>
            <div :class="$style.form">
                <Nuxt/>
            </div>
        </div>
        <notifications group="foo" />
    </div>
</template>
<script lang="ts">
export default {
    name: "auth",
}
</script>
<style lang="less" module>
@import url("/assets/style/less-mixin.less");

.layout-auth {
    position: relative;
}

.auth {
    display: flex;
    min-height: 100vh;
    flex-basis: 50%;
    background: #f5f7fa;
}
.column {
    display: flex;
    flex-direction: column;
    justify-content: center;
    flex: 0 1 50%;
    padding-inline: 10px;
}
.logo {
    .column();
    flex-basis: 25%;
    color: var(--gm-colors-white);
    background-color: var(--gm-main-colorfull-background-color);

    &-content {
        margin-block: auto;
        width: 100%;
        height: 300px;
        .custom-img();

        img {
            object-fit: contain;
        }
    }
}

.form {
    flex-grow: 1!important;
    display: flex;
    align-items: center;

    .column();
}
@media screen and (max-width: @md) {
    .logo {
        display: none;
    }
    .form {
        flex-grow: 0;
    }
}
</style>