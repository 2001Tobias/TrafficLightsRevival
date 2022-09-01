<h1>TrafficLightRevival by Tobias Indenkämpen</h1>

This plugin is almost 99% written by pierosavi because I used his ImageIt Plugin as the foundation for my plugin. <br>
I made only a few changes to his code so I could revive the deprecated TrafficLights Plugin.

ImageIt Grafana: https://grafana.com/grafana/plugins/pierosavi-imageit-panel/ <br>
ImageIt GitHub:  https://github.com/pierosavi/pierosavi-imageit-panel

I know there are already two existing TrafficLights Plugins, but these don't seem to work with Grafana v8.0.0 and above.

The functions of this plugin are inspired by the existing TrafficLights Plugin by smartmakers / Volodymyr Manilo.

smartmakers TrafficLights Grafana: https://grafana.com/grafana/plugins/smartmakers-trafficlight-panel/ <br>
smartmakers TrafficLights GitHub:  https://github.com/smartmakers/grafana-trafficlight

Standard Color values are:
 - 0 = gray
 - 1 = red
 - 2 = yellow
 - 3 = green

Other functionalties are:
 - change the values of the colors
 - setting an Image by URL as background
 - create round dot sensors an move them around
 - hovering over a Sensor displays the name, value and button to move the sensors
 - the size of the sensors can be set by the user
 - the font color of name and value can be changed
 - lock sensor movement

Known Bugs:
 - Cant use custom color picker
 - In edit view the sensor cannot be moved as freely as in dashboard view. Fix: Reload the site and it works fine.

Version history:

v1.2.0
 - Fixed bug that, when sensor is locked, it didn't show the name and value on hover
 - General cleanup

v1.1.0
 - added variable changing of values to color (note that if two colors have the same value, the lower color will be picked automatically)
 - added changing of sensors size for each sensor -> before: one size option for all sensors