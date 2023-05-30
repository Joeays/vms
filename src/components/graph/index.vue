<template>
    <div id="container"></div>
</template>

<script>
import G6 from '@antv/g6'

const data = {
    nodes: [
        {
            id: 'node1',
            subType: 'exchange',
            label: 'D8:9E:61:6C:B1:B3 (Huawei Device Ltd)',
            properties: {
                "Op": "Request",
                "SrcMAC": "D8:9E:61:6C:B1:B3 (Huawei Device Ltd)",
                "DstMAC": "00:00:00:00:00:00",
                "SrcIP": "192.168.1.2",
                "DstIP": "192.168.1.1",
            }
        },
        {
            id: 'node2',
            subType: 'ethernet',
            label: 'F4:B8:A7:DE:68:85 (ZTE Corporation)',
            properties: {
                "Op": "Request",
                "SrcMAC": "F4:B8:A7:DE:68:85 (ZTE Corporation)",
                "DstMAC": "00:00:00:00:00:00",
                "SrcIP": "192.168.1.1",
                "DstIP": "192.168.1.11",
            }
        },
        {
            id: 'node3',
            subType: 'ethernet',
            label: '78:31:C1:B8:3B:78 (Apple)',
            properties: {
                "Op": "Reply",
                "SrcMAC": "78:31:C1:B8:3B:78 (Apple)",
                "DstMAC": "F4:B8:A7:DE:68:85 (ZTE Corporation)",
                "SrcIP": "192.168.1.5",
                "DstIP": "192.168.1.1",
            }
        },
        {
            id: 'node4',
            subType: 'broadcast',
            label: 'FF:FF:FF:FF:FF:FF',
            properties: {
                "Op": "Reply",
                "SrcMAC": "78:31:C1:B8:3B:78 (Apple)",
                "DstMAC": "36:9B:7E:77:D9:7C",
                "SrcIP": "192.168.1.1",
                "DstIP": "192.168.1.5",
            }
        },
    ],
    edges: [
        {
            source: 'node1',
            target: 'node2',
        },
        {
            source: 'node1',
            target: 'node3',
        },
        {
            source: 'node3',
            target: 'node2',
        },
        {
            source: 'node2',
            target: 'node4',
        },
    ],
}
export default {
    name: "graph",
    data() {
        return {}
    },
    mounted() {
        this.initGraph()
    },
    methods: {
        initGraph() {
            const container = document.getElementById('container');
            const width = container.clientWidth
            const height = container.clientHeight
            const tooltip = new G6.Tooltip({
                offsetX: 0,
                offsetY: 0,
                className: 'g6-node-tooltip',
                getContent(e) {
                    const itemModel = e.item.getModel()
                    let innerHTML = []
                    for (const prop in itemModel.properties) {
                        innerHTML.push(`<div>${itemModel.properties[prop]}</div>`)
                    }
                    return innerHTML.join('')
                },
                itemTypes: ['node']
            })
            G6.registerNode("real-node", {
                draw(cfg, group) {
                    const label = group.addShape('text', {
                        attrs: {
                            x: 30,
                            y: 10,
                            textAlign: 'left',
                            textBaseline: 'middle',
                            text: cfg.label,
                            fill: 'rgba(0,0,0,.85)',
                        },
                        name: 'text-shape',
                        draggable: true,
                    })
                    const imageShape = group.addShape('image', {
                        attrs: {
                            x: 0,
                            y: 0,
                            img: require(`@/assets/images/graph/${cfg.subType}.png`),
                            width: 20,
                            height: 20,
                        },
                        name: 'image-shape'
                    })
                    return label, imageShape
                }
            })
            const graph = new G6.Graph({
                container: 'container',
                width,
                height,
                layout: {
                    type: 'random',
                    width: 500,
                    height: 500,
                },
                plugins: [tooltip],
                animate: true,
                modes: {
                    default: ['drag-combo', 'drag-canvas', 'drag-node', 'zoom-canvas']
                },
                defaultNode: {
                    type: 'real-node',
                    labelCfg: {}
                },
                defaultEdge: {
                    style: {
                        lineWidth: 2,
                        stroke: '#bccfb4',
                    },
                },
            })
            graph.data(data)
            graph.render()
            graph.on('edge:mouseenter', (evt) => {
                const { item } = evt;
                graph.setItemState(item, 'active', true);
            })

            graph.on('edge:mouseleave', (evt) => {
                const { item } = evt;
                graph.setItemState(item, 'active', false);
            })
        }
    }
}
</script>

<style lang="scss" scoped>
#container {
    min-height: 700px;
}

::v-deep .g6-node-tooltip {
    width: auto;
    min-width: 50px;
    min-height: 50px;
    padding: 10px;
    z-index: 2100;
    background-color: rgba(0, 0, 0, .75);
    border: 1px solid rgba(0, 0, 0, 0.6);
    color: #fff;
    font-size: 12px;
    line-height: 20px;
    border-radius: 4px;
    word-wrap: break-word;
}
</style>
