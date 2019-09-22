import { TestBed, inject } from '@angular/core/testing';

import { HelpersService } from './helpers.service';
import { TranslateService } from '@ngx-translate/core';
import { MatDialog, MatSnackBar } from '@angular/material';

describe('HelpersService >>', () => {
  let service: HelpersService;
  const fakeTranslateService = {};
  const fakeMatSnackBar = {};
  const fakeMatDialog = {};

  beforeEach(() => { service = new HelpersService(
    fakeTranslateService as TranslateService,
    fakeMatSnackBar as MatSnackBar,
    fakeMatDialog as MatDialog
  ); });

  describe('#removeEmptyKeys >>', () => {
    it('should properly remove empty keys if there are empty values', () => {
      expect(service.removeEmptyKeys({
        name: 'name',
        name2: 'name2',
        name3: '',
        name4: 'name4',
        name5: undefined,
        name6: null,
      })).toEqual({
        name: 'name',
        name2: 'name2',
        name4: 'name4'
      });
    });
    it('should not remove any keys if there are not empty values', () => {
      expect(service.removeEmptyKeys({
        name: 'name',
        name2: 'name2',
        name3: 'name3'
      })).toEqual({
        name: 'name',
        name2: 'name2',
        name3: 'name3'
      });
    });
  });

  describe('#getTimeFrameValues >>', () => {
    it('should return properly timestamp values', () => {
      expect(service.getTimeFrameValues()).toEqual([
        0,
        7200000,
        14400000,
        21600000,
        28800000,
        36000000,
        43200000,
        50400000,
        57600000,
        64800000,
        72000000,
        79200000,
        86400000
      ]);
    });
  });

  describe('#getTimeZones >>', () => {
    it('should return properly time zones values', () => {
      expect(service.getTimeZones()).toEqual([
        '+00:00',
        '+01:00',
        '+02:00',
        '+03:00',
        '+03:30',
        '+04:00',
        '+04:30',
        '+05:00',
        '+05:30',
        '+05:45',
        '+06:00',
        '+06:30',
        '+07:00',
        '+08:00',
        '+08:45',
        '+09:00',
        '+09:30',
        '+10:00',
        '+10:30',
        '+11:00',
        '+12:00',
        '+13:00',
        '+13:45',
        '+14:00',
        '-01:00',
        '-02:00',
        '-02:30',
        '-03:00',
        '-04:00',
        '-05:00',
        '-06:00',
        '-07:00',
        '-08:00',
        '-09:00',
        '-09:30',
        '-10:00',
        '-11:00',
        '-12:00'
      ]);
    });
  });

  describe('#getCurrentOffsetValue >>', () => {
    it('should return properly current time zone', () => {
      const timezone = 'Europe/Kiev';
      expect(service.getCurrentOffsetValue()).toEqual('+03:00');
    });
  });

  describe('#generateListNumber >>', () => {
    it('should return properly arrray of values', () => {
      expect(service.generateListNumber(2, 7)).toEqual([2, 3, 4, 5, 6, 7]);
    });
  });
});
