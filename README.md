# LeiAVG

雷氏文字 AVG 框架

## 游玩

打开网页后，点击 “开始游戏” 即可。单击屏幕任意处或按任意键都可以推进剧情。暂不支持回溯功能。

## 创作

创作者只需要编辑 `gameData.json` 即可。

```json
{
    "metadata": {
        "title": "游戏标题",
        "author": "游戏作者",
        "cover": "封面图片路径"
    }, 
    "script": [
        // 剧本内容，详见下文
    ]
}
```

### 剧本编辑

在 `gameData.json` 中的 `script` 字段内编辑。

这是一个数组（array），其中每一项代表一帧剧情。每一项包括以下字段：

- `id`：一个数字，表示这一帧剧情的 ID（不必按顺序）。
- `text`：显示的文字内容（旁白或对话，显示在对话框中）。
- `character`：角色名。
- `backgroundImage`：背景图片，可选，不存在时继承之前的背景图片，null 表示黑色背景。
- <del>`characterImage`：角色图片，可选（未完成，开发中）</del>
- `valueEvent`：一个数字，用户有一个初始值为 0 的 `value`，这里表示对这个数字的增减值。这个数字会通过 `goto` 和 `choices` 控制剧情的走向。
- `goto`: 下一帧的 ID，为空或不存在时默认是剧情数组中的下一项；或为 `"end"`，表示游戏结束。
    也可以是一个数组：
    ``` 
    "goto": [
        {"nextId": 下一帧的id, "valueRange": [下限, 上限]（只有 value 在这个范围内才可以切换到那一帧）}
    ]
    ```
    多个 `valueRange` 条件同时满足时，切换到第一个满足的那一帧；没有 `valueRange` 满足时，结束游戏（等同于 "end"）。

- `choices`：选项，适用于具有选择的特殊帧。choices 是一个数组，格式如下：
    ``` 
    "choices" : [
        {"text": 选项A, "goto": 选择该选项后切换到的帧, "valueRange": [lowerLimit, upperLimit]（只有value在这个范围内才显示这个选项）},
        {"text": 选项B, "goto": 选择该选项后切换到的帧, "valueRange": [lowerLimit, upperLimit]（只有value在这个范围内才显示这个选项）}
        ...
    ]
    ```

## License

MIT（仅程序部分，剧本部分不适用）

## Acknowledgements

这个项目主要是 GitHub Copilot 写的（）
