input.onButtonEvent(Button.B, input.buttonEventClick(), function () {
    pins.comment(pins.pins_text("Wachzeit (normal 15 Sekunden)"))
    sekunden = 20
    basic.showNumber(sekunden)
    pins.voice_waketime(sekunden)
})
function feste_Kommandos (id: number) {
    if (id == 45) {
        basic.clearScreen()
    } else if (id >= 52 && id <= 61) {
        pins.comment(pins.pins_text("Display number zero 52=0 .. 61=9"))
        basic.showNumber(id - 52)
    } else if (id == 62) {
        basic.showIcon(IconNames.Happy)
    } else if (id == 63) {
        basic.showIcon(IconNames.Sad)
    } else if (id == 64) {
        basic.showIcon(IconNames.Heart)
    } else if (id == 65) {
        basic.clearScreen()
    } else if (id == 69) {
        pins.comment(pins.pins_text("Read temperature"))
        pins.zeigeText("" + input.temperature() + "°C")
        basic.showNumber(input.temperature())
    } else if (id == 82) {
        control.reset()
    } else if (id == 116) {
        basic.setLedColor(0xff0000)
    } else {
    	
    }
}
let cmd_id = 0
let sekunden = 0
pins.addDisplay(pins.pins_DigitalPin(DigitalPin.C16), pins.pins_DigitalPin(DigitalPin.C17))
pins.clearDisplays()
basic.pause(2000)
let wachzeit = pins.voice_register(6)
pins.zeigeZahl(wachzeit)
let connected = wachzeit >= 0
if (connected) {
    basic.setLedColor(0x00ff00)
} else {
    basic.setLedColor(0xff0000)
}
basic.forever(function () {
    if (connected) {
        cmd_id = pins.voice_read_cmdid()
        if (cmd_id == 0) {
            basic.pause(2000)
        } else {
            pins.zeigeZahl(cmd_id)
            if (cmd_id >= 5 && cmd_id <= 21) {
                pins.comment(pins.pins_text("erlernte Kommandos 5..20 -> A..Q"))
                basic.showString(String.fromCharCode(cmd_id + 60))
            } else {
                feste_Kommandos(cmd_id)
            }
        }
    }
    basic.pause(500)
})
