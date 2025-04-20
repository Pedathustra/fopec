if exists(select * from sys.procedures where name = 'insCompanyLocation')
begin
	drop proc insCompanyLocation;
end
go

create proc insCompanyLocation
	@company_id int,
	@address_id int,
	@isHQ bit
as 
	set nocount on;
	if exists(
		select * 
		from company_location
		where company_id = @company_id
			and address_id = @address_id 
	)
	begin
		return -1
	end
	   		
	insert into company_location(
		company_id,
		address_id,
		isHQ
	)
	values (
		@company_id,
		@address_id,
		@isHQ
		)

		return 0;
 

go