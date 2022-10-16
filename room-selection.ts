import { Component, ElementRef, EventEmitter, HostListener, Input, OnChanges, OnInit, Output, ViewChild, } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { TranslateService } from '@ngx-translate/core';
import { DndDropEvent } from 'ngx-drag-drop';
import { Observable } from 'rxjs';

import { LoaderType } from '../../loader-types';
import { LanguageService } from '@/app/core/services/language/language.service';
import { UserService } from '@/app/core/services/user/user.service';
import { ApiClient } from '@/app/helpers/api-client';
import { ApiHotelService } from '@/app/helpers/api/api-hotel.service';
import { MainService } from '@/app/main/main.service';
import { selectFileDialog } from '@/app/main/window/shared/forms/file-dialog';
import { Loading } from '@/app/shared/loader.decorator';
import { LoaderService } from '@/app/shared/loader.service';
import { environment } from '@/environments/environment';
import {
  selectRoomDefaultValueModel,
  WishRoomData,
  WishRoomEntityGroup,
  WishRoomFloor,
  WishRoomFloorLocale,
  WishRoomLocale,
} from '../../models';

@Component({
  selector: 'app-room-selection-administration-config',
  templateUrl: './room-selection-administration-config.component.pug',
  styleUrls: ['./room-selection-administration-config.component.sass'],
})
export class RoomSelectionAdministrationConfigComponent
  implements OnInit, OnChanges {
  @ViewChild('dragContainer', { static: false }) dragContainerRef: ElementRef;

  @Input() wishRoomData: WishRoomData;
  @Output() initParent = new EventEmitter<void>();

  public form: FormGroup;
  public locales: WishRoomLocale[];
  public floors: WishRoomFloor[];
  public entityGroups: WishRoomEntityGroup[];
  public isLoading: Observable<boolean>;
  public selectedTab = 0;
  public highlightArea = '';
  public selectedFloor: WishRoomFloor;
  public selectedArea: any;
  public env = environment;
  public areaBoundries: BoundryObject;
  public mouse: { x: number; y: number };
  public startPosition: { x: number; y: number };
  public defaultLocale: string;
  public isImageUploading: boolean;
  public isTextItalic: boolean;
  public roomDefaultValue = true;
  public selectRoomDefaultValue: selectRoomDefaultValueModel.NotAvailable;

  public newAreas = [
    {
      handle: false,
      disable: false,
      effectAllowed: 'copyMove',
      data: { type: '1' },
    },
    {
      handle: false,
      disable: false,
      effectAllowed: 'copyMove',
      data: { type: '2' },
    },
  ];

  constructor(
    private apiClient: ApiClient,
    private userService: UserService,
    private languageService: LanguageService,
    private apiHotel: ApiHotelService,
    private mainService: MainService,
    public loaderService: LoaderService,
    private translateService: TranslateService
  ) {
    this.isLoading = this.loaderService.isLoading(LoaderType.LOAD);
    this.defaultLocale = this.mainService.getCompanyDetails().c_beLocale_id.toString();
  }

  private loadForm(): void {
    const selectedArea = this.selectedArea || {};
    this.form = new FormGroup({
      wa_top: new FormControl(selectedArea.wa_top || ''),
      wa_left: new FormControl(selectedArea.wa_left || ''),
      wa_width: new FormControl(selectedArea.wa_width || ''),
      wa_height: new FormControl(selectedArea.wa_height || ''),
      wa_entity_id: new FormControl(selectedArea.wa_entity_id || ''),
    });
  }

  @Loading(LoaderType.LOAD)
  public async uploadImage() {
    const file = await selectFileDialog('image/x-png,image/gif,image/jpeg');
    if (file) {
      this.isImageUploading = true;
      const customerId = `${this.userService.hotelId || 0}`;
      const imageType = `wrmFloorImage_${this.selectedFloor.wf_id || ''}`;
      const imgStr: string = await this.apiClient
        .uploadRoomFloorImage(customerId, file, imageType)
        .toPromise();
      const imgObj: any = JSON.parse(imgStr);
      this.selectedFloor.wf_picPath = imgObj.wf_picPath;
      this.selectedFloor.wf_origPicWidth = imgObj.wf_origPicWidth;
      this.selectedFloor.wf_origPicHeight = imgObj.wf_origPicHeight;
      // GET NEW IMAGE BOUNDRIES //
      this.getAreaBoundary();
    }
    this.isImageUploading = false;
  }

  private async getLocalStr(localKey: string): Promise<string> {
    const localValue = await this.translateService
      .get(`ebc.${localKey}`)
      .toPromise();
    return localValue;
  }

  @HostListener('dragover', ['$event'])
  onDragOver(event: DragEvent): void {
    this.mouse = {
      x: event.clientX,
      y: event.clientY,
    };
  }

  private getAreaName(area: any): string {
    let name = '';
    if (area.wa_entityGroup_id === '-1') {
      name = this.getLocalStr('WRM.ChooseAnEntity.text').toString();
    } else if (area.wa_entityGroup_id === '0') {
      name = this.getLocalStr('WRM.unavailable.text').toString();
    } else {
      const eg = this.entityGroups.find(
        (a) => a.eg_id === area.wa_entityGroup_id
      );
      if (eg) {
        name = eg.eg_name;
        const e = eg.entities.find((b) => b.e_id === area.wa_entity_id);
        if (e) {
          name += ' - ' + e.e_uniqueNo;
        }
      } else {
        name = '????';
      }
    }
    return name;
  }

  public getAreaBoundary(): BoundryObject {
    if (this.dragContainerRef && this.dragContainerRef.nativeElement) {
      const backImg = document.querySelector('#background');
      this.areaBoundries = {
        width: backImg
          ? backImg.clientWidth
          : this.dragContainerRef.nativeElement.clientWidth,
        height: backImg
          ? backImg.clientHeight
          : this.dragContainerRef.nativeElement.clientHeight,
      };
    } else {
      this.areaBoundries = { width: 670, height: 380 };
    }
    return this.areaBoundries;
  }

  private async initAreaNames(): Promise<void> {
    const { floors, entityGroups } = this.wishRoomData;
    this.entityGroups = entityGroups;
    const floorPreFix = await this.translateService
      .get('ebc.WRM.floor.text')
      .toPromise();
    this.floors = floors.map((floor) => {
      floor.display_Letter = `${floorPreFix} ${floor.wf_id}`;
      floor.deleted = 'off';
      floor.areas = floor.areas.map((area) => {
        area.name = this.getAreaName(area);
        area.default_wa_top = area.wa_top;
        area.default_wa_left = area.wa_left;
        area.default_wa_width = area.wa_width;
        area.default_wa_height = area.wa_height;
        area.deleted = 'off';
        return area;
      });
      return floor;
    });
  }

  public switchLeftList(tabIndex: any): void {
    if (this.selectedTab === tabIndex) {
      return;
    }
    if ((!this.selectedFloor || !this.selectedFloor.wf_id) && tabIndex > 0) {
      return;
    }
    this.selectedTab = tabIndex;
  }

  public selectFloor(floor: WishRoomFloor): void {
    if (this.selectedFloor && this.selectedFloor.wf_id === floor.wf_id) {
      return;
    }
    floor.areas = floor.areas.map((area) => {
      area.default_wa_top = area.wa_top;
      area.default_wa_left = area.wa_left;
      return area;
    });
    this.selectedFloor = floor;
    this.selectedArea = {};
    this.selectedTab = 1;
    this.loadForm();
    this.getAreaBoundary();
  }

  public selectArea(area: any): void {
    if (this.selectedArea && this.selectedArea.wa_id === area.wa_id) {
      return;
    }
    console.log('area', area);
    this.selectedArea = area;
    this.loadForm();
  }

  public onAreaMove(draggedArea: any, xyPosition: any): void {
    const area = this.selectedFloor.areas.find(
      (x) => x.wa_id === draggedArea.wa_id
    );
    area.wa_top = `${Math.floor(xyPosition.top)}`;
    area.wa_left = `${Math.floor(xyPosition.left)}`;
    if (this.selectedArea && this.selectedArea.wa_id === area.wa_id) {
      this.selectedArea = area;
      this.loadForm();

      const floorIndex = this.floors.findIndex(
        (f) => f.wf_id === this.selectedFloor.wf_id
      );
      const areaIndex = this.selectedFloor.areas.findIndex(
        (a) => a.wa_id === this.selectedArea.wa_id
      );
      this.floors[floorIndex].areas[areaIndex] = area;
    }
  }

  private getRandomNumber(): string {
    return (Math.random() + 1).toString().replace('.', '');
  }

  public async onNewAreaCreate(
    type: string,
    position: PositionObject
  ): Promise<void> {
    this.isTextItalic = true;
    const area = document.querySelector('#new' + type);
    const scrollArea = document.querySelector('#dragContain');
    let scrollTop = 0;
    if (scrollArea) {
      scrollTop = scrollArea.scrollTop;
    }
    if (area) {
      this.startPosition = {
        x: Math.floor(this.startPosition.x - area.getBoundingClientRect().left),
        y: Math.floor(this.startPosition.y - area.getBoundingClientRect().top),
      };
    }
    const name = await this.translateService
      .get('ebc.WRM.ChooseAnEntity.text')
      .toPromise();
    console.log('name', name);
    const randomNumber = this.getRandomNumber();
    const top = `${position.top - (this.startPosition ? this.startPosition.y : 0) + scrollTop || 0}`;
    const left = `${position.left - (this.startPosition ? this.startPosition.x : 0) || 0}`;
    const newArea = {
      wa_id: `new_${randomNumber}`,
      wa_height: '50',
      wa_width: '50',
      wa_top: top,
      wa_left: left,
      default_wa_width: '50',
      default_wa_height: '50',
      default_wa_top: top,
      default_wa_left: left,
      wa_wrmAreaType_id: type,
      wa_wrmFloor_id: this.selectedFloor.wf_id,
      wa_entity_id: '0',
      wa_entityGroup_id: '0',
      newArea: true,
      deleted: 'off',
      name,
    };
    this.selectedFloor.areas.push(newArea);
    this.selectedArea = newArea;
    this.loadForm();
  }

  @HostListener('mousedown', ['$event'])
  onDragStart(event: MouseEvent): void {
    this.startPosition = {
      x: event.pageX,
      y: event.pageY,
    };
  }

  public onDndDrop(event: DndDropEvent): void {
    if (event) {
      const { type } = event.data || '';
      let position = {
        left: Math.floor(event.event.offsetX),
        top: Math.floor(event.event.offsetY),
      };
      const area = document.querySelector('#dragContain');
      if (area) {
        position = {
          left: Math.floor(this.mouse.x - area.getBoundingClientRect().left),
          top: Math.floor(this.mouse.y - area.getBoundingClientRect().top),
        };
      }
      this.onNewAreaCreate(type, position).catch();
    }
  }

  public async createNewFloor(): Promise<void> {
    const randomNumber = this.getRandomNumber();
    const floorPreFix = await this.translateService
      .get('ebc.WRM.floor.text')
      .toPromise();
    const newFloor: WishRoomFloor = {
      areas: [],
      locales: [],
      wf_id: randomNumber,
      wf_origPicHeight: 0,
      wf_origPicWidth: 0,
      wf_picPath: null,
      isNew: true,
      floorLocaleName: `${floorPreFix} new`,
      deleted: 'off',
    };
    const { locales } = this.wishRoomData;
    if (locales) {
      locales.forEach((locale) => {
        const randomId = this.getRandomNumber();
        const newFloorLocale: WishRoomFloorLocale = {
          wfl_id: `new_${randomId}`,
          wfl_locale_id: locale.l_id,
          wfl_text: `${floorPreFix} new`,
          wfl_wrmFloor_id: 'new',
        };
        newFloor.locales.push(newFloorLocale);
      });
    }
    this.selectedFloor = newFloor;
    this.floors.push(newFloor);
  }

  public getFilteredFloors(): WishRoomFloor[] {
    if (this.floors) {
      this.floors = this.floors.map(floor => {
        const roomFloorLocale = floor.locales.find(locale => locale.wfl_locale_id === this.defaultLocale);
        if (roomFloorLocale) {
          const {wfl_text} = roomFloorLocale;
          floor.floorLocaleName = wfl_text;
        }
        return floor;
      });
      return this.floors.filter((a) => !(a.deleted && a.deleted === 'on'));
    }
    return [];
  }

  public getFilteredAreas(): any[] {
    let returnData: any = [];
    if (this.selectedFloor && this.selectedFloor.areas) {
      console.log('this.selectedFloor.areas', this.selectedFloor.areas);
      returnData = this.selectedFloor.areas.filter((a) => !(a.deleted && a.deleted === 'on'));
    }
    console.log('returnData', returnData);
    return returnData;
  }

  public deleteFloor(): void {
    const floor = this.floors.find((x) => x.wf_id === this.selectedFloor.wf_id);
    if (floor) {
      floor.deleted = 'on';
    }
    const activeFloors = this.getFilteredFloors();
    if (activeFloors.length > 0) {
      this.selectedFloor = activeFloors[0];
    } else {
      this.selectedFloor = {} as WishRoomFloor;
    }
    this.selectedArea = {};
  }

  public deleteArea(): void {
    const area = this.selectedFloor.areas.find(
      (x) => x.wa_id === this.selectedArea.wa_id
    );
    if (area) {
      area.deleted = 'on';
    }
    this.selectedArea = {};
  }

  public toNumber(value: string | number): number {
    return Number(value);
  }

  public changeAreaDetails(filed: string): void {
    if (this.selectedArea) {
      const fieldVal = this.form.value[filed];
      this.selectedArea[filed] = fieldVal;
      this.selectedArea[`default_${filed}`] = fieldVal;
      this.isTextItalic = true;
      if (filed === 'wa_entity_id') {
        let entityGroupId = fieldVal;
        this.entityGroups.forEach((eg) => {
          const findEntry = eg.entities.find((e) => e.e_id === fieldVal);
          if (findEntry) {
            entityGroupId = eg.eg_id;
          }
        });
        this.selectedArea.wa_entityGroup_id = entityGroupId;
        this.selectedArea.name = this.getAreaName(this.selectedArea);
      } else if (
        filed === 'wa_width' &&
        this.selectedArea.wa_wrmAreaType_id === '2'
      ) {
        this.selectedArea.wa_height = fieldVal;
        this.selectedArea.default_wa_height = fieldVal;
        (this.form.get('wa_height') as FormControl).setValue(fieldVal);
      }
    }
  }

  @Loading(LoaderType.LOAD)
  public async save(): Promise<void> {
    this.wishRoomData.customerId = this.userService.hotelId || 0;
    this.wishRoomData.localeId = this.languageService.getLanguageId();
    const floors = JSON.parse(JSON.stringify(this.floors));
    this.wishRoomData.floors = floors.map((floor) => {
      floor.areas = floor.areas.map((area) => {
        if (area.newArea) {
          area.wa_id = 'new';
        }
        if (area.deleted && area.deleted === 'off') {
          delete area.deleted;
        }
        delete area.default_wa_top;
        delete area.default_wa_left;
        delete area.default_wa_width;
        delete area.default_wa_height;

        area.wa_entity_id = Number(area.wa_entity_id);
        area.wa_entityGroup_id = Number(area.wa_entityGroup_id);

        if (area.wa_entityGroup_id === 0) {
          this.roomDefaultValue = false;
          // this.roomDefaultValue = true;
          this.selectRoomDefaultValue = selectRoomDefaultValueModel.NotAvailable;
        }

        return area;
      });
      if (floor.isNew) {
        floor.wf_id = 'new';
        floor.locales = floor.locales.map((locale) => {
          locale.wfl_id = 'new';
          return locale;
        });
        delete floor.isNew;
      }
      if (floor.deleted && floor.deleted === 'off') {
        delete floor.deleted;
      }
      delete floor.display_Letter;
      return floor;
    });
    const res = await this.apiHotel
      .postWishRoomData(this.wishRoomData)
      .toPromise();
    if (res) {
      this.initParent.emit();
    }
    this.isTextItalic = false;
  }

  public init(): void {
    this.initAreaNames().catch();
  }

  ngOnInit(): void {
    this.init();
    console.log('this.getFilteredAreas()', this.getFilteredAreas());
  }

  ngOnChanges(): void {
    this.init();
  }
}

interface BoundryObject {
  width: number;
  height: number;
}

interface PositionObject {
  top: number;
  left: number;
}
