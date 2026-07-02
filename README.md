# 摄影佬人格测试（photo-mbti）

测试网站：[PhotoMBTI](https://photombti.dpdns.org)

**此测试受SBTI启发，在此给出项目链接（可能非官方）：[SBTI 测试（镜像）](https://github.com/UnluckyNinja/SBTI-test)**

*主要图一乐，大部分内容由AI生成，经本人小改，如有不妥当之处，欢迎批评指导。*

一个基于 React + Vite 的趣味人格测试应用。  
通过 20 道摄影相关选择题，输出 20 种“摄影圈人格”中的一种结果。

## 功能概览
- 20 题单选测试，覆盖街拍、风光、人像、视频、器材等常见摄影偏好。
- 20 个人格结果卡，包含名称、副标题和描述。
- 结果判定采用标准化评分，降低题库覆盖差异造成的天然偏置。
- 保留题目与人格文案风格，优先保证“作答倾向 -> 结果”逻辑一致性。

## 技术栈
- React 19
- TypeScript
- Vite
- Tailwind CSS 4
- Motion

## 评分与结果判定
结果判定公式：

`adjustedScore = ((rawScore - expectedScore) / stdDev) * sqrt(coverage / totalQuestions) + supportRatio * 0.25`

并列决胜规则：

`rawScore > hitCount > id字典序`
