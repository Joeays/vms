<template>
    <label role="checkbox"
           :class="toggleShow && value !== 0 ? 'left': !toggleShow && value !== 0  ? 'right':'disable'"

           class="main-switch">
        <input type="checkbox" class="switch-input" @change="toggle"/>
        <div class="switch-core">
            <div class="switch-button"/>
            <span class="switch-label" v-html="value"/>
        </div>
    </label>
</template>

<script>
export default {
    name: 'toggleSwitch',
    data() {
        return {
            toggleShow: this.show,
        }
    },
    props: {
        show: {
            type: Boolean,
            default: true
        },
        value: {
            type: Number,
            default: 0
        },
    },
    methods: {
        toggle(event) {
            this.toggleShow = !this.toggleShow
            this.$emit('change', event)
        }
    }
}
</script>

<style scoped lang="scss">
.main-switch {
    display: inline-block;
    position: relative;
    overflow: hidden;
    vertical-align: middle;
    user-select: none;
    font-size: 10px;
    cursor: pointer;

    .switch-input {
        display: none;
    }

    .switch-core {
        display: block;
        position: relative;
        box-sizing: border-box;
        overflow: hidden;
        outline: 0;
        margin: 0;
        transition: border-color .3s, background-color .3s;
        user-select: none;
        min-width: 30px;
        width: 100%;
        height: 16px;
        border-radius: 50px;
        line-height: 16px;

        .switch-button {
            transition: all .2s ease-in-out;
            width: 12px;
            height: 12px;
            display: block;
            border-radius: 50%;
            position: absolute;
            overflow: hidden;
            top: 2px;
            z-index: 3;
            transform: translate3d(0, 0, 0);
            background-color: #fff;
            box-shadow: 0 2px 4px 0 rgba(0, 35, 11, .2);
        }

        .switch-label {
            transition: all .2s ease-in-out;
            font-size: 12px;
            color: #fff;
            display: inline-block;
        }
    }

    &.left {
        .switch-core {
            background-color: #1890ff;

            .switch-button {
                right: 2px;
            }

            .switch-label {
                width: calc(100% - 16px);
                padding: 0 16px 0 4px;
            }
        }
    }

    &.right {
        .switch-core {
            background-color: rgba(0, 0, 0, .25);

            .switch-button {
                left: 2px;
            }

            .switch-label {
                width: calc(100% - 16px);
                padding: 0 4px 0 16px;
            }
        }
    }

    &.disable {
        cursor: not-allowed;
        .switch-core {
            background-color: rgba(0, 0, 0, .25);

            .switch-button {
                left: 2px;
            }

            .switch-label {
                width: calc(100% - 16px);
                padding: 0 4px 0 16px;
            }
        }
    }
}
</style>
