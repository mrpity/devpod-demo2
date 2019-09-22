import { Moment } from 'moment';

export interface AutomationRuleInterface {
  frequency: string;
  activeTimeFrom: string;
  activeTimeTo: string;
  zoneOffset: string;
  daysOfWeek?: string[];
  dayOfMonth?: number;
  expirationDate?: string;
  maxConnections?: number;
  onceDate?: string;
}

export class AutomationRule implements AutomationRuleInterface {
  activeTimeFrom: string;
  activeTimeTo: string;
  dayOfMonth: number;
  daysOfWeek: string[];
  expirationDate: string;
  frequency: string;
  maxConnections: number;
  onceDate: string;
  zoneOffset: string;

  constructor(
    activeTimeFrom: string,
    activeTimeTo: string,
    dayOfMonth: number,
    daysOfWeek: string[],
    expirationDate: string,
    frequency: string,
    maxConnections: number,
    onceDate: string,
    zoneOffset: string
  ) {
    this.activeTimeFrom = activeTimeFrom;
    this.activeTimeTo = activeTimeTo;
    this.dayOfMonth = dayOfMonth;
    this.daysOfWeek = daysOfWeek;
    this.expirationDate = expirationDate;
    this.frequency = frequency;
    this.maxConnections = maxConnections;
    this.onceDate = onceDate;
    this.zoneOffset = zoneOffset;
  }
}

export interface AutomationRuleOnceInterface {
  frequency: string;
  onceDate: string;
  activeTimeFrom: string;
  activeTimeTo: string;
  zoneOffset: string;
}

export class AutomationRuleOnce implements AutomationRuleOnceInterface {
  activeTimeFrom: string;
  activeTimeTo: string;
  frequency: string;
  onceDate: string;
  zoneOffset: string;

  constructor(object) {
    this.activeTimeFrom = object.activeTimeFrom;
    this.activeTimeTo = object.activeTimeTo;
    this.frequency = object.frequency;
    this.onceDate = object.onceDate;
    this.zoneOffset = object.zoneOffset;
  }
}

export interface AutomationRuleDailyInterface {
  frequency: string;
  activeTimeFrom: string;
  activeTimeTo: string;
  zoneOffset: string;
  expirationDate?: Moment | null;
  maxConnections?: number | null;
}

export class AutomationRuleDaily implements AutomationRuleDailyInterface {
  activeTimeFrom: string;
  activeTimeTo: string;
  expirationDate: Moment;
  frequency: string;
  maxConnections: number;
  zoneOffset: string;

  constructor(object) {
    this.activeTimeFrom = object.activeTimeFrom;
    this.activeTimeTo = object.activeTimeTo;
    this.frequency = object.frequency;
    this.maxConnections = object.maxConnections;
    this.zoneOffset = object.zoneOffset;
    this.expirationDate = object.expirationDate;
  }
}


