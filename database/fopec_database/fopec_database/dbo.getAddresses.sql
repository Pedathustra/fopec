if exists(select * from sys.procedures where name = 'getAddresses')
begin
	drop proc getAddresses;
end
go

create proc getAddresses
	@id int
as 
	set nocount on;

	select id,
			line1,
			line2,
			city,
			state, 
			zip
	from address

go