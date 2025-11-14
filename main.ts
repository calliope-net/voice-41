input.onButtonEvent(Button.B, input.buttonEventClick(), function () {
    pins.comment(pins.pins_text("Wachzeit (normal 15 Sekunden)"))
    sekunden = 20
    basic.showNumber(sekunden)
    pins.voice_waketime(sekunden)
})
function read_cmdid () {
    bu = pins.pins_i2cWriteReadBuffer(pins.pins_i2cAdressen(pins.ei2cAdressen.Voive_x64), pins.buffer_fromArray([2]), 1)
    return pins.buffer_getUint8(bu, 0)
}
function musik () {
    music.startMelody(music.builtInMelody(Melodies.Entertainer), MelodyOptions.Once)
}
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
        basic.showNumber(input.temperature())
    } else if (id == 82) {
        control.reset()
    } else if (id == 116) {
        basic.setLedColor(0xff0000)
    } else {
    	
    }
}
let cmd_id = 0
let bu: Buffer = null
let sekunden = 0
pins.addDisplay(pins.pins_DigitalPin(DigitalPin.C16), pins.pins_DigitalPin(DigitalPin.C17))
pins.clearDisplays()
pins.zeigeZahl(10)
basic.forever(function () {
    if (!(basic.simulator())) {
        cmd_id = pins.voice_read_cmdid()
        if (cmd_id == pins.voice_read_cmdid()) {
            pins.comment(pins.pins_text("kein Kommando erkannt, 0 nicht anzeigen"))
            basic.pause(2000)
        } else {
            pins.comment(pins.pins_text("Kommando erkannt, ID anzeigen"))
            pins.zeigeZahl(cmd_id)
            pins.comment(pins.pins_text("Kommando ID auswerten"))
            if (cmd_id >= 5 && cmd_id <= 21) {
                pins.comment(pins.pins_text("erlernte Kommandos 5..20 -> A=65..Q=81"))
                basic.showString(String.fromCharCode(cmd_id + 60))
            } else {
                pins.comment(pins.pins_text("feste Kommandos 22..141"))
                feste_Kommandos(cmd_id)
            }
        }
    }
    basic.pause(500)
})
