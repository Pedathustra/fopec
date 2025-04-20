if exists(select * from sys.procedures where name = 'delCompanyLocation')
begin
	drop proc delCompanyLocation;
end
go

create proc delCompanyLocation
	@company_id int,
	@address_id int

as 
	set nocount on;

	delete 
	from company_location
	where	company_id = @company_id
		and	address_id = @address_id;
	return 0;
go