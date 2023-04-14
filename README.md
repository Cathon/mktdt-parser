# mktdt-parser

The mktdt-parser is a tool that parses and displays the meaning of fields in various types of market data files without the need for manual lookup.

mktdt-parser 是一个通用的解析数据并展示字段含义的小工具。该工具的初衷是为了解决某些证券行情文件中无表头、字段类型多样的问题，避免手动查询接口文档来查找字段含义的繁琐过程。

# 应用场景

如果你有很多类型繁多的文本数据文件（比如证券市场的 mktdt00.txt 文件），每个文件中的字段不尽相同，而且在文件中没有标注字段含义的表头信息。

当你需要查找文件中某个字段的值，或者确定文件中某个值的字段含义时，就需要去查阅对应的接口文档，甚至要数某个字段是第几列。

如果你有这样的需求，那么这将是一个非常实用的小工具。当然，你可以解析的数据类型不局限于目前预定义的这几种。

该工具的优点在于通用化，你可以根据自己所在行业的实际需要自定义特定的文件类型，一般都是 txt 或者 csv 格式的纯文本数据文件。

# 安装

你可以直接访问 https://cathon.github.io/mktdt-parser/ 来在线使用。

如果你需要本地调试，可以下载代码，通过 Visual Studio Code 配合 Live Server 插件进行运行。

如果你需要本地部署，可以通过 web 服务器（如 nginx）来运行。（提示：直接在浏览器打开本地文件，可能存在跨域报错）

# 使用方法

如果需要自定义特定的数据文件类型：

1. 在 filetypes 目录下准备好对应的 Json 文件，例如 spec_file.json
2. 在 filetypes.json 配置文件中，增加对应文件类型的配置信息

spec_file.json 的字段定义如下：
- $.delimiter 表示文件中的字段分隔符
- $.fields[x] 表示文件中各个字段的描述和备注信息，数组中的元素依次表示其在文件中的顺序
- $.fields[x].name 表示字段的名称
- $.fields[x].comment 表示该字段的备注信息

filetypes.json 的字段定义如下：
- $[x].name 表示文件类型的名称，将在 HTML 的文件类型单选框中显示出来
- $[x].path 表示自定义的文件类型在 filetypes 目录下的相对路径，将作为数据解析的依据

# 主要项目负责人

@ChatGPT

该项目属于那种我一直想做一直懒得动手的那种，最终在 C 老师的帮助下完成了，耗时约两小时（代码贡献率 99%）。

项目的整个实现过程可以参考[这个文件](chatgpt.md)，希望对你有所帮助。 

# 开源协议

GPL-3.0 license
