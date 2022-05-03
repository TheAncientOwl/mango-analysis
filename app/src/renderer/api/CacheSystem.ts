export class CacheSystem {
  static Clear = (): void => {
    sessionStorage.clear();
  };

  static Remove = (key: string): void => {
    sessionStorage.removeItem(key);
  };

  static SetItem = <T>(key: string, value: T): void => {
    const stringValue = JSON.stringify(value);

    window.sessionStorage.setItem(key, stringValue);
  };

  static GetItem = <T>(key: string): T => {
    const item = window.sessionStorage.getItem(key);

    return JSON.parse(item);
  };

  static GetItemOrDefault = <T>(key: string, def: T): T => {
    const item = window.sessionStorage.getItem(key);

    if (item === null) {
      CacheSystem.SetItem<T>(key, def);
      return def;
    }

    return JSON.parse(item);
  };
}
