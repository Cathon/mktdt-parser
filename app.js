window.onload = function () {
    // 获取单选框组元素
    const radioGroup = document.getElementById("file-type");

    // 异步加载配置文件列表并添加选项到单选框组中
    fetch("filetypes.json")
        .then(response => response.json())
        .then(fileTypes => {
            fileTypes.forEach(fileType => {
                const radioBtn = document.createElement("input");
                radioBtn.type = "radio";
                radioBtn.name = "file-type";
                radioBtn.value = fileType.name;
                if (radioGroup.childElementCount === 0) {
                    radioBtn.checked = true;
                }
                const label = document.createElement("label");
                label.innerHTML = fileType.name;
                label.prepend(radioBtn);
                radioGroup.appendChild(label);
            });
        })
        .catch(error => {
            console.error(error);
            alert("无法从 filetypes.json 加载文件类型列表，请刷新页面重试。");
        });

    // 绑定“解析”按钮的点击事件处理程序
    const parseBtn = document.getElementById("parse-btn");
    parseBtn.onclick = function () {
        // 获取选定的文件类型名称和配置文件路径
        const selectedFileType = document.querySelector("input[name=file-type]:checked").value;
        const selectedFilePath = "filetypes/" + selectedFileType + ".json";

        // 异步加载选定的配置文件
        fetch(selectedFilePath)
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error("无法加载选定的配置文件，请刷新页面重试。");
            })
            .then(config => {
                try {
                    // 获取分隔符和字段信息
                    const delimiter = config.delimiter;
                    const fields = config.fields;

                    // 获取文本框中的原始数据并分割为数组
                    const rawData = document.getElementById("raw-data").value;
                    const rows = rawData.trim().split(/\r?\n/);

                    // 生成表头
                    const thead = document.createElement("thead");
                    const tr = document.createElement("tr");
                    fields.forEach(field => {
                        const th = document.createElement("th");
                        th.innerText = field.name;
                        tr.appendChild(th);
                    });
                    thead.appendChild(tr);

                    // 生成表格内容
                    const tbody = document.createElement("tbody");
                    rows.forEach(row => {
                        try {
                            const tdData = row.trim().split(delimiter).map(data => data.trim());
                            const tr = document.createElement("tr");
                            tdData.forEach(data => {
                                const td = document.createElement("td");
                                td.innerText = data;
                                tr.appendChild(td);
                            });
                            tbody.appendChild(tr);
                        } catch (error) {
                            console.error(error);
                            alert("解析文件内容时发生错误，请检查输入的内容和文件类型。");
                            return;
                        }
                    });

                    // 清空表格并添加新的表头和内容
                    const table = document.getElementById("parsed-table");
                    table.innerHTML = "";
                    table.appendChild(thead);
                    table.appendChild(tbody);
                } catch (error) {
                    console.error(error);
                    alert("解析文件内容时发生错误，请检查输入的内容和文件类型。");
                }
            })
            .catch(error => {
                console.error(error);
                alert(error.message);
            });
    };

};