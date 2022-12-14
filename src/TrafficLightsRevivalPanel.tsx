import React, { useEffect, useRef, useState } from 'react';
import { PanelProps, getFieldDisplayValues, ReducerID } from '@grafana/data';
import { css, cx } from 'emotion';
import { uniqueId, cloneDeep } from 'lodash';
import { stylesFactory, useTheme2 } from '@grafana/ui';
import { SimpleOptions } from './types/SimpleOptions';
import { Sensor } from './Sensor';
import { Mapping } from './types/Mapping';
import SensorType from './types/Sensor';

interface Props extends PanelProps<SimpleOptions> {}

export const TrafficLightsRevivalPanel: React.FC<Props> = ({
  options,
  data,
  width,
  height,
  onOptionsChange,
  fieldConfig,
  replaceVariables,
}) => {
  const { forceImageRefresh, lockSensors, mappings, sensors, sensorsColorGray, sensorsColorRed, sensorsColorYellow, sensorsColorGreen } = options;
  const theme = useTheme2();
  const styles = getStyles();

  const imageRef = useRef<HTMLImageElement>(null);
  const [imageDimensions, setImageDimensions] = useState({ height: 0, width: 0 });

  const [imageUrl, setImageUrl] = useState(options.imageUrl);

  useEffect(() => {
    if (forceImageRefresh) {
      setImageUrl(`${options.imageUrl}?${uniqueId()}`);
    } else {
      setImageUrl(options.imageUrl);
    }
  }, [data, options.imageUrl, forceImageRefresh]);

  useEffect(() => {
    setImageDimensions({
      height: imageRef.current!.offsetHeight,
      width: imageRef.current!.offsetWidth,
    });
  }, [width, height]);

  const onImageLoad = ({ target: image }: any) => {
    setImageDimensions({
      height: image.offsetHeight,
      width: image.offsetWidth,
    });
  };

  const onSensorPositionChange = (position: SensorType['position'], index: number) => {
    const newOptions = cloneDeep(options);
    newOptions.sensors[index].position = position;

    onOptionsChange(newOptions);
  };

  return (
    <div className={styles.wrapper}>
      <div
        id="TrafficLightsRevivalBgImage"
        className={cx(
          styles.imageWrapper,
          css`
            max-height: ${height}px;
          `
        )}
      >
        {sensors &&
          sensors.map((sensor: SensorType, index: number) => {
            const serie = data.series.find((serie) =>
              sensor.query.id ? sensor.query.id === serie.refId : sensor.query.alias === serie.name
            );

            let value = undefined;

            if (serie !== undefined) {
              const fieldDisplay = getFieldDisplayValues({
                data: [serie],
                reduceOptions: {
                  calcs: [ReducerID.last],
                },
                fieldConfig,
                replaceVariables,
                theme,
              })[0];

              value = fieldDisplay.display.numeric;
            }

            const sensorMappings: Mapping[] = sensor.mappingIds
              .map((mappingId) => mappings.find((mapping: Mapping) => mappingId === mapping.id))
              .filter((mapping) => typeof mapping !== 'undefined') as Mapping[];

            return (
              <Sensor
                sensorscolorgray={sensorsColorGray}
                sensorscolorred={sensorsColorRed}
                sensorscoloryellow={sensorsColorYellow}
                sensorscolorgreen={sensorsColorGreen}
                draggable={lockSensors}
                sensor={sensor}
                mappings={sensorMappings}
                index={index}
                link={replaceVariables(sensor.link)}
                name={replaceVariables(sensor.name)}
                imageDimensions={imageDimensions}
                onPositionChange={onSensorPositionChange}
                value={value}
                key={index}
                sensorsTextSize={sensor.sensorsTextSize}
              />
            );
          })}

        <img
          className={cx(
            styles.bgImage,
            css`
              max-height: ${height}px;
            `
          )}
          src={imageUrl}
          ref={imageRef}
          onLoad={onImageLoad}
          draggable="false"
        />
      </div>
    </div>
  );
};

const getStyles = stylesFactory(() => {
  return {
    wrapper: css`
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
    `,
    imageWrapper: css`
      position: relative;
      display: inline-block;
      max-width: 100%;
    `,
    bgImage: css`
      max-width: 100%;
    `,
    textBox: css`
      position: absolute;
      bottom: 0;
      left: 0;
      padding: 10px;
    `,
  };
});
