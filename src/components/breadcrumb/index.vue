<template>
    <el-card shadow="never" class="main-breadcrumb">
        <div class="breadcrumb-content">
            <ul class="item-breadcrumb">
                <li><a>
                    <svg-icon icon-class="list-ul" class-name="list-ul"/>
                </a></li>
                <li><a>shark1.pcapng</a></li>
                <li><a class="current">{{ $route.meta.title }}</a></li>
            </ul>
            <div class="breadcrumb-tool">
                <el-button round>
                    <svg-icon icon-class="link"/>
                    Copy Link
                </el-button>
                <el-button round>
                    <svg-icon icon-class="download"/>
                    Download (5 Mb)
                </el-button>
            </div>
        </div>
    </el-card>
</template>

<script>
export default {
    name: "breadcrumb"
}
</script>

<style scoped lang="scss">
.main-breadcrumb {
    ::v-deep .el-card__body {
        padding: 0;
    }

    .breadcrumb-content {
        background: #eee;
        border-radius: 4px;
        box-shadow: 0 0 2px rgba(0, 0, 0, .2);
        height: 40px;

        .item-breadcrumb {
            float: left;

            .list-ul {
                font-size: 14px;
                color: #666;
                line-height: 40px;
            }
        }

        .item-breadcrumb li {
            float: left;
        }

        .item-breadcrumb li > a {
            padding: 0 1em 0 2em;
            height: 40px;
            line-height: 40px;
            float: left;
            text-decoration: none;
            color: #444;
            font-size: 14px;
            position: relative;
            text-shadow: 0 1px 0 rgba(255, 255, 255, .5);
            background-color: #ddd;
            background-image: linear-gradient(to right, #f5f5f5, #ddd)
        }

        .item-breadcrumb li > a:hover {
            background: #fff
        }

        .item-breadcrumb li > a::after, .item-breadcrumb li > a a::before {
            content: "";
            position: absolute;
            top: 50%;
            margin-top: -1.5em;
            border-top: 1.5em solid transparent;
            border-bottom: 1.5em solid transparent;
            border-left: 1em solid;
            right: -1em
        }

        .item-breadcrumb li > a::after {
            z-index: 2;
            border-left-color: #ddd
        }

        .item-breadcrumb li > a::before {
            border-left-color: #ccc;
            right: -1.1em;
            z-index: 1
        }

        .item-breadcrumb li > a:hover::after {
            border-left-color: #fff
        }

        .item-breadcrumb li:first-child a {
            padding-left: 1em;
            border-radius: 5px 0 0 5px
        }

        .item-breadcrumb .current, .item-breadcrumb .current:hover {
            font-weight: bold;
            background: none
        }

        .item-breadcrumb .current::after, .item-breadcrumb .current::before {
            content: normal
        }

        .breadcrumb-tool {
            height: 40px;
            float: right;
            padding-top: 4px;
            padding-right: 10px;

            .el-button {
                height: 32px
            }
        }
    }
}
</style>
