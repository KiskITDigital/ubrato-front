export const transformServices = (
  services: {
    group_name: string;
    id: number;
    name: string;
    price: number;
  }[]
) => {
  const newServices: { id: number; name: string; price: number }[] = [];

  services
    .sort((c, n) => c.price - n.price)
    .forEach((e) => {
      if (!newServices.find((i) => i.name === e.group_name)) {
        newServices.push({ name: e.group_name, id: e.id, price: e.price });
      }
    });

  return newServices;
};
