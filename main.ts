input.onButtonEvent(Button.B, input.buttonEventClick(), function () {
    basic.comment(basic.basic_text("Wachzeit (normal 15 Sekunden)"))
    sekunden = 20
    basic.showNumber(sekunden)
    w = pins.pins_i2cWriteBuffer(pins.pins_i2cAdressen(pins.ei2cAdressen.Voive_x64), pins.buffer_fromArray([6, sekunden]))
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
        basic.comment(basic.basic_text("Display number zero 52=0 .. 61=9"))
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
        basic.comment(basic.basic_text("Read temperature"))
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
let w = 0
let sekunden = 0
let _4digit = grove.createDisplay(DigitalPin.C16, DigitalPin.C17)
_4digit.set(6)
basic.forever(function () {
    if (!(basic.simulator())) {
        cmd_id = read_cmdid()
        if (cmd_id == 0) {
            basic.comment(basic.basic_text("kein Kommando erkannt, 0 nicht anzeigen"))
            basic.pause(2000)
        } else {
            basic.comment(basic.basic_text("Kommando erkannt, ID anzeigen"))
            _4digit.show(cmd_id)
            basic.comment(basic.basic_text("Kommando ID auswerten"))
            if (cmd_id >= 5 && cmd_id <= 21) {
                basic.comment(basic.basic_text("erlernte Kommandos 5..20 -> A=65..Q=81"))
                basic.showString(String.fromCharCode(cmd_id + 60))
            } else {
                basic.comment(basic.basic_text("feste Kommandos 22..141"))
                feste_Kommandos(cmd_id)
            }
        }
    }
    basic.pause(500)
})
