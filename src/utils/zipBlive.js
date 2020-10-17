import * as FileSaver from 'file-saver'
import * as JsZip from 'jszip/dist/jszip.js'

// 打包
export const zipPack = (uuid, data, info = {}) => {
    try {
        const zip = new JsZip()
        zip.file('Blive.json', JSON.stringify(data));
        const packageFile = {
            template: uuid,
            name: "测试导出",
            version: '1.0.0',
            dependencies: {
                //
            }
        }
        zip.file(`说明.txt`, `## 描述
#  这是一份Blive所生成的文档，该文档存放由用户编辑保存各项简介数据，Blive程序副本文件，作为永久性存档。
#
#  用户保存的存档(当前压缩包)可单独解压取。 该文件被内置工具解析成了"json"文件。
#  查看简介实际内容可使用导入功能在工作台内查看，因为往往还未经过Blive实际编译，必然出现简介排版问题，具体阅读Blive帮助中心内“编译周期”。

## 导入
#  打开Blive找到“导入”功能，直接导入该压缩包即可。
`);
        zip.file('package.json', JSON.stringify(Object.assign(packageFile, info)));
        zip.generateAsync({type: "blob"}).then((content) => {
            FileSaver.saveAs(content, `${uuid}.Blive`);
        })
        return true
    } catch (e) {
        return false
    }
}

// 解包
export const zipUnPack = (data) => {
    console.log(data)
}
