// 系统魔法师 - 展示程序的超能力！（跨平台版本）
// 这个程序会展示程序是如何"控制"你的电脑的，支持Windows、macOS、Linux

const fs = require('fs');
const os = require('os');
const path = require('path');
const { exec } = require('child_process');

// 检测操作系统
const platform = os.platform();
const isWindows = platform === 'win32';
const isMac = platform === 'darwin';
const isLinux = platform === 'linux';

console.log('🧙‍♂️ 系统魔法师正在启动...');
console.log(`🖥️  检测到操作系统: ${platform === 'win32' ? 'Windows' : platform === 'darwin' ? 'macOS' : platform === 'linux' ? 'Linux' : platform}`);
console.log('准备展示程序的超能力！\n');

// 跨平台系统命令工具
const platformCommands = {
    openUrl: (url) => {
        if (isWindows) return `start "" "${url}"`;
        if (isMac) return `open "${url}"`;
        if (isLinux) return `xdg-open "${url}"`;
        return `echo "不支持的操作系统"`;
    },
    
    playSound: () => {
        if (isWindows) {
            // Windows系统声音
            return `powershell -c "[console]::beep(800,500)"`;
        }
        if (isMac) {
            // macOS系统声音
            return `afplay /System/Library/Sounds/Basso.aiff`;
        }
        if (isLinux) {
            // Linux系统声音（需要安装beep或使用speaker-test）
            return `speaker-test -t sine -f 800 -l 1 -s 1`;
        }
        return `echo "🔊 播放声音（模拟）"`;
    },
    
    speak: (text) => {
        if (isWindows) {
            // Windows语音合成
            return `powershell -Command "Add-Type -AssemblyName System.Speech; $speak = New-Object System.Speech.Synthesis.SpeechSynthesizer; $speak.Speak('${text}')"`;
        }
        if (isMac) {
            // macOS语音合成
            return `say "${text}"`;
        }
        if (isLinux) {
            // Linux语音合成（需要安装espeak）
            return `espeak "${text}" 2>/dev/null || echo "🗣️  语音: ${text}"`;
        }
        return `echo "🗣️  语音: ${text}"`;
    },
    
    showDialog: (title, message) => {
        if (isWindows) {
            // Windows消息框
            const escapedMessage = message.replace(/"/g, '\\"').replace(/\n/g, '\\n');
            return `powershell -Command "[System.Windows.Forms.MessageBox]::Show('${escapedMessage}', '${title}', 'OK', 'Information')" 2>nul`;
        }
        if (isMac) {
            // macOS对话框
            const escapedMessage = message.replace(/'/g, "\\'").replace(/"/g, '\\"');
            return `osascript -e 'display dialog "${escapedMessage}" with title "${title}" buttons {"太棒了!"} default button "太棒了!"'`;
        }
        if (isLinux) {
            // Linux对话框（需要安装zenity）
            return `zenity --info --title="${title}" --text="${message}" 2>/dev/null || echo "📦 ${title}: ${message}"`;
        }
        return `echo "📦 ${title}: ${message}"`;
    }
};

// 魔法1: 获取系统信息 - 程序可以"读取"你的电脑
function showSystemInfo() {
    console.log('🔍 魔法1: 读取系统信息');
    console.log('程序正在扫描你的电脑...\n');
    
    const systemInfo = {
        '操作系统': os.type(),
        '系统版本': os.release(),
        '平台': os.platform(),
        '用户名': os.userInfo().username,
        '主机名': os.hostname(),
        '总内存': `${Math.round(os.totalmem() / 1024 / 1024 / 1024)}GB`,
        '可用内存': `${Math.round(os.freemem() / 1024 / 1024 / 1024)}GB`,
        'CPU核心数': os.cpus().length,
        'CPU型号': os.cpus()[0].model,
        '架构': os.arch()
    };
    
    Object.entries(systemInfo).forEach(([key, value]) => {
        console.log(`   ${key}: ${value}`);
    });
    console.log('');
}

// 魔法2: 打开网站 - 程序可以"召唤"网页
function openWebsite() {
    console.log('🌐 魔法2: 召唤网页');
    console.log('程序正在打开浏览器和网站...\n');
    
    // 打开百度网站
    exec(platformCommands.openUrl('https://www.baidu.com'), (error) => {
        if (!error) {
            console.log('✅ 成功打开百度网站！');
        } else {
            console.log('📱 尝试打开网站（可能需要默认浏览器设置）');
        }
    });
    
    setTimeout(() => {
        console.log('🎯 程序刚刚控制了你的浏览器！\n');
    }, 2000);
}

// 魔法3: 播放系统声音和语音合成 - 程序可以"发声"和"说话"
function playSystemSounds() {
    console.log('🔊 魔法3: 让电脑发声和说话');
    console.log('程序正在播放系统声音和语音...\n');
    
    // 先播放一个系统声音
    exec(platformCommands.playSound(), (error) => {
        if (!error) {
            console.log('🎵 播放系统提示音成功！');
        } else {
            console.log('🎵 播放系统提示音（模拟）');
        }
    });
    
    // 然后让系统说话！
    setTimeout(() => {
        console.log('🗣️  程序开始说话...');
        
        const speeches = [
            {
                text: isWindows ? '我是你的程序' : '你好！我是你创造的程序！',
                description: '程序打招呼'
            },
            {
                text: '我能在任何地方跑',
                description: '程序介绍跨平台能力'
            },
            {
                text: isWindows ? '我跑在 Windows' : isMac ? '我跑在苹果电脑' : '我在运行',
                description: '程序识别操作系统'
            },
            {
                text: '编程很酷，老师很牛',
                description: '程序赞美编程'
            },
            {
                text: '现在请叫我程序员。',
                description: '程序祝贺用户'
            }
        ];
        
        speeches.forEach((speech, index) => {
            setTimeout(() => {
                console.log(`💬 ${speech.description}: "${speech.text}"`);
                
                // 使用跨平台语音合成
                exec(platformCommands.speak(speech.text), (error) => {
                    if (error) {
                        console.log(`🗣️  语音输出: ${speech.text}`);
                    } else {
                        console.log(`✅ 语音播放成功！`);
                    }
                });
            }, index * 3000); // 每隔3秒说一句
        });
        
        // 最后播放一个庆祝声音
        setTimeout(() => {
            exec(platformCommands.playSound(), (error) => {
                if (!error) {
                    console.log('🎉 播放庆祝音效成功！');
                } else {
                    console.log('🎉 播放庆祝音效（模拟）');
                }
            });
        }, speeches.length * 3000);
        
    }, 1000);
}

// 魔法4: 创建彩色终端输出 - 程序可以"变色"
function colorfulDisplay() {
    setTimeout(() => {
        console.log('\n🌈 魔法4: 七彩显示');
        console.log('程序正在变换颜色...\n');
        
        // ANSI颜色代码（跨平台支持）
        const colors = {
            reset: '\x1b[0m',
            red: '\x1b[31m',
            green: '\x1b[32m',
            yellow: '\x1b[33m',
            blue: '\x1b[34m',
            magenta: '\x1b[35m',
            cyan: '\x1b[36m',
            bright: '\x1b[1m'
        };
        
        const messages = [
            { color: 'red', text: '🔴 红色魔法！' },
            { color: 'green', text: '🟢 绿色魔法！' },
            { color: 'yellow', text: '🟡 黄色魔法！' },
            { color: 'blue', text: '🔵 蓝色魔法！' },
            { color: 'magenta', text: '🟣 紫色魔法！' },
            { color: 'cyan', text: '🔷 青色魔法！' }
        ];
        
        messages.forEach((msg, index) => {
            setTimeout(() => {
                console.log(colors[msg.color] + colors.bright + msg.text + colors.reset);
            }, index * 300);
        });
        
        setTimeout(() => {
            console.log(colors.bright + '🌟 跨平台颜色魔法完成！' + colors.reset);
            
            // 颜色完成后直接进入最终魔法
            showFinalMagic();
        }, messages.length * 300 + 1000);
        
    }, 20000); // 给语音留出足够时间
}

// 终极魔法: 弹出总结对话框（跨平台）
function showFinalMagic() {
    setTimeout(() => {
        console.log('\n🎊 所有魔法演示完毕！');
        console.log('现在来个终极魔法 - 跨平台系统对话框！\n');
        
        const platformName = isWindows ? 'Windows' : isMac ? 'macOS' : isLinux ? 'Linux' : '未知系统';
        
        const finalMessage = `🧙‍♂️ 魔法演示完毕！

你刚刚在 ${platformName} 上见证了程序的超能力：
• 📊 读取系统信息
• 🌐 打开网站
• 🔊 播放声音和语音合成
• 🌈 控制显示颜色

这就是编程的魔法！
一个小小的程序就能控制整个电脑系统！
而且可以在任何操作系统上运行！

恭喜你成为跨平台程序魔法师！🎉`;
        
        exec(platformCommands.showDialog('🧙‍♂️ 程序魔法师', finalMessage), (error) => {
            if (error) {
                console.log('📦 魔法总结：');
                console.log(finalMessage);
            } else {
                console.log('✨ 终极跨平台魔法施展成功！');
            }
        });
    }, 1000);
}

// 开始魔法表演
console.log('🎬 跨平台魔法表演开始！\n');

// 按顺序执行各种魔法
showSystemInfo();

setTimeout(() => {
    openWebsite();
}, 2000);

setTimeout(() => {
    playSystemSounds();
}, 5000);

colorfulDisplay(); 
